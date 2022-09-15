<template>
	<div class="outbox">
        <el-container>
			<el-header>Header</el-header>
			<el-container>
				<el-aside width="200px"> <el-button class="create-button" @click="createForm" type="primary">创建项目 +</el-button></el-aside>
				<el-main>

				</el-main>
			</el-container>
		</el-container>
		<el-dialog title="收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<el-form-item label="选项一" :label-width="formLabelWidth">
					<div class="item">
                        <el-input v-model="form.name1" autocomplete="off"></el-input>:
						<el-input v-model="form.name2" autocomplete="off"></el-input>
						<el-tag class="hover">新增</el-tag>
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dialogFormVisible: true,
			formLabelWidth: '60px',
			form:[]
		}
	},
	mounted() {
	},
	methods:{
		createForm() {
			this.dialogFormVisible = !this.dialogFormVisible
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
</style>