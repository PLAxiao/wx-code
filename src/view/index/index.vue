<template>
	<div class="outbox">
        <el-container>
			<el-header style="padding-top: 20px;font-size: 15px;display: flex;">
				欢迎来到二维码生成器
				<!-- <div style="margin-left: 50px;">
					<el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
						<el-button slot="append" icon="el-icon-search"></el-button>
					</el-input>
				</div> -->
			</el-header>
			<el-container>
				<el-aside width="200px"> <el-button class="create-button" @click="createForm" type="primary">创建项目 +</el-button></el-aside>
				<el-main>
					<el-table
						:data="tableData"
						border>
						<el-table-column
							prop="name"
							label="名称"
							>
						</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
						>
						   <template slot-scope="scope">
                               <span class="status-edit">{{handelTime(scope.row.createTime)}}</span>
                            </template>

						</el-table-column>
						<el-table-column
							prop="updateTime"
							label="更新时间"
							>
							<template slot-scope="scope">
                               <span class="status-edit">{{handelTime(scope.row.updateTime)}}</span>
                            </template>
						</el-table-column>
						<el-table-column
							label="操作"
						>
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
								<el-button @click="handleClick(scope.row, scope.row.url)" type="text" size="small">生成二维码</el-button>
								<!-- <el-button type="text" size="small" @click="createForm('edit', scope.row)">编辑</el-button> -->
								<el-button type="text" size="small" @click="deleteItem(scope.row.id)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-main>
				<div class="bottom">
					<el-pagination
					@current-change="handleCurrentChange"
					layout="prev, pager, next"
					:total="totalElements">
				</el-pagination>
				</div>

			</el-container>
		</el-container>
		<el-dialog title="新建项目" :visible.sync="dialogFormVisible">
			<el-form>
				<div style="display: flex;margin-bottom: 20px;">
					<span style="width:55px;margin-left:17px;">项目名称</span>
					<el-input v-model="name" placeholder="请输入项目名称"></el-input>
				</div>
				<div v-for="(item, index) of form" :key="index">
						<el-form-item :label="`选项${index + 1}`" :label-width="formLabelWidth" >
						<div class="item">
							<el-input v-model="item.name" autocomplete="off"></el-input>:
							<el-input v-model="item.val" autocomplete="off"></el-input>
						</div>
					</el-form-item>
					<el-tag class="hover" v-if="form.length -1 == index" @click="addItem(index + 2)">新增</el-tag>
				</div>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="saveFome">确 定</el-button>
			</div>
		</el-dialog>
		<el-dialog title="新建表单" :visible.sync="isQRCode">
      <div id="qrcode" ref="qrCodeUrl"></div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isQRCode = false">关闭</el-button>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import axios from 'axios';
	import QRCode from 'qrcodejs2'
export default {
	data() {
		return {
			url:'http://47.108.66.41:9992',
			dialogFormVisible: false,
			isedit: false,
      isQRCode: false,
			formLabelWidth: '60px',
			searchInput: '',
			totalElements: 0,
			id: 0,
			name:'',
			form:[
				{
					name: '',
					val: '',
					index: '选项1',
				}
			],
			tableData: []
		}
	},
	mounted() {
		this.init()
	},
	methods:{
		init() {
        this.$http.get('/data/page').then(res =>{
				this.tableData = res.content
				this.totalElements = res.totalElements
			})
		},
		createForm(type, content) {
			if(type == 'edit') {
				this.isedit = true
				this.name = content.name
				this.id = content.id
				this.form = [JSON.parse(content.content)]
				let arr = []
				Object.keys(JSON.parse(content.content)).forEach(key =>{
					arr.push({name: key, val: JSON.parse(content.content)[key] })
				})
				this.form = arr
			} else{
				this.isedit = false
			}
			this.dialogFormVisible = !this.dialogFormVisible
		},
		addItem(index) {
			this.form.push({
				name: '',
				val: '',
				index: '选项' + index
			})
		},
		handleCurrentChange(val) {
			this.$http.get(`/data/page?pageNum=${val}`).then(res =>{
				this.tableData = res.content
				this.totalElements = res.totalElements
			})
		},
		handelTime(time) {
            if(!time) return time;
			var date = time.substr(0, 10); //年月日
			var timeFlag = date
			timeFlag = timeFlag.replace(/-/g, "/");
			timeFlag = new Date(timeFlag);
			timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
			timeFlag = timeFlag.getFullYear() + '-' + ((timeFlag.getMonth() + 1) < 10 ? "0" + (timeFlag.getMonth() + 1) : (timeFlag.getMonth() + 1)) + '-' + (timeFlag.getDate() < 10 ? "0" + timeFlag.getDate() : timeFlag.getDate());
			return timeFlag
		},
		saveFome() {
			let content = {}
			let bol = this.form.every(item =>{
				return item.val && item.name
			})
			if(!bol) {
				return this.$message({
				message: '有没填写文字，表单请填写完整',
				type: 'warning'
			});
			}
			this.form.forEach(item => {
				if(item.val && item.name) {
					return content[item.name] = item.val
				}
			})
			if(this.isedit) {
				this.$http.post('/data/save',{
					content:JSON.stringify(content),
					name:this.name,
					id: this.id
				}).then(res =>{
					this.init()
				})
			} else {
				this.$http.post('/data/save',{
					content:JSON.stringify(content),
					name:this.name
				}).then(res =>{
					this.init()
				})
			}

      this.createForm()
			this.form = [{
				name: '',
				val: '',
				index: '选项1',
			}]

		},
		handleClick(row, url) {
			if(url) {
				this.isQRCode = true
				this.addQRCode(row, url)
			} else {
				this.$router.push({
					name:'detail',
					query:{
						id: row.id
					}
				})
				// window.open(`data/${row.id}`)
			}
		},
		addQRCode(row, url) {
			  this.isShowOpen()
			  new QRCode(this.$refs.qrCodeUrl, {
					text: 'http://47.108.66.41:8081/#/detail?id=52',//url,
					width: 200,
					height: 200,
					colorDark: "#000000",  
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.H
				});
		},
		isShowOpen () {
			if(!this.isQRCode) return
				const codeHtml = document.getElementById("qrcode");
				codeHtml.innerHTML = "";
		},
		deleteItem(id) {
			axios.delete(`/data/${id}`).then(res => {
				this.init()
			})
		}
	}
};
</script>
<style lang="less" scoped>
  .outbox,.el-container{
	height:100%;
	overflow: hidden;
  }
  .el-header{
	border-bottom: 1px solid #ccc;
  }
  .el-aside{
	border-right:1px solid #ccc;
	.create-button{
		margin:100px 0 0 50px;
	}
  }
  .item{
	display: flex;
	align-items: center;
	justify-content: space-evenly;
  }
  .hover{
	cursor: pointer;
  }
	.bottom{
		position: absolute;
		bottom:100px;
		right:20px;
	}
	#qrcode{
    margin:auto;
  }
</style>