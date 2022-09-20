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
							prop="id"
							label="id"
							>
						</el-table-column>
						<el-table-column
							prop="createTime"
							label="创建时间"
							>
						</el-table-column>
						<el-table-column
							prop="updateTime"
							label="更新时间"
							>
						</el-table-column>
						<el-table-column
							label="操作"
						>
							<template slot-scope="scope">
								<el-button @click="handleClick(scope.row.content)" type="text" size="small">查看</el-button>
								<el-button type="text" size="small">编辑</el-button>
								<!-- <el-button type="text" size="small">生成二维码</el-button> -->
								<el-button type="text" size="small" v-if="scope.row.deleted">删除</el-button>
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
		<el-dialog title="新建表单" :visible.sync="dialogFormVisible">
			<el-form>
				<div style="display: flex;margin-bottom: 20px;">
					<span style="width:50px;margin-left:17px;">表头</span>
					<el-input v-model="name" placeholder="请输入表头名"></el-input>
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
	</div>
</template>
<script>
import JsonpTemplatePlugin from 'webpack/lib/web/JsonpTemplatePlugin';
export default {
	data() {
		return {
			dialogFormVisible: false,
			formLabelWidth: '60px',
			searchInput: '',
			totalElements: 0,
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
		this.$http.get('http://47.108.66.41:9992/data/page').then(res =>{
			this.tableData = res.content
			this.totalElements = res.totalElements
		})
	},
	methods:{
		createForm() {
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
			this.$http.get('http://47.108.66.41:9992/data/page', {pageNum: val}).then(res =>{
					this.tableData = res.content
					this.totalElements = res.totalElements
				})

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
			console.log(content, 'dd',JSON.stringify(content), 999)
			this.$http.post(`http://47.108.66.41:9992/data?content=${JSON.stringify(content)}&name=${this.name}`).then(res =>{
				console.log(res)
			})
			this.form = [{
				name: '',
				val: '',
				index: '选项1',
			}]
			this.createForm()
		},
		handleClick(row) {
      this.$router.push({
				name:'detail',
				params:{
					content: row
				}
		})
    },
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
</style>