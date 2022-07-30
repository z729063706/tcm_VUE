<template>
  <div class>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/admin/medicine' }">药物管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <!-- <el-button size="mini" type="default" @click="dialoadAddView= true">添加药物</el-button> -->
      <el-dialog class="dialog-addUser" title="药物信息编辑" :visible.sync="dialoadAddView">
        <div class="layout-row">
          <h3>药物名称</h3>
          <el-input v-model="medicineName" placeholder="请输入药物名称"></el-input>
        </div>
        <div class="layout-row">
          <h3>单价</h3>
          <el-input v-model="medicinePrice" placeholder="请输入每g单价"></el-input>
        </div>
        <div class="layout-row">
          <h3>余量</h3>
          <el-input v-model="medicineLeftnumber" placeholder="请输入余量(默认为最多,25535)"></el-input>
        </div>
        <div class="layout-row">
          <h3>缩写</h3>
          <el-input v-model="medicineDesc" placeholder="自定义拼音缩写"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialoadAddView = false">取 消</el-button>
          <el-button type="primary" @click="medicineAdd">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="medicineList"
        :row-class-name="isVaild"
        style="width: 100%"
      >
        <el-table-column prop="name" label="品名"></el-table-column>
        <el-table-column prop="price" label="单价"></el-table-column>
        <el-table-column prop="leftnumber" label="余量"></el-table-column>
        <el-table-column prop="short_desc" label="拼音缩写"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="danger" @click="picDelete(scope.row.id)">删除</el-button> -->
            <el-button size="mini" type="danger" @click="medecineEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      msg: "Hello 管理员管理",
      medicineName:"",
      medicinePrice:"",
      medicineLeftnumber:"",
      medicineDesc:"",
      medicineId:"",
      dialoadAddView: false,
      medicineList:{}
    };
  },

  computed: {},
  watch: {},
  methods: {
    medicineAdd() {
      let obj = {
        name: this.medicineName,
        price: this.medicinePrice,
        leftnumber: this.medicineLeftnumber,
        short_desc: this.medicineDesc,
        id : this.medicineId
      };
      this.axios
        .post("/api/updatemedecine", obj)
        .then(res => {
            this.$message({
              type: "success",
              message: "添加成功"
            });
            this.dialoadAddView = false;
            this.axios.get("api/getmedecine")
            .then(res=>{
              this.medicineList = res.data;
            });
            this.medicineList.splice(0, 1);
        })
        .catch(() => {
          this.$message({
              type: "error",
              message: "系统错误"
            });
        });
    },
    medecineEdit(scope){
      this.dialoadAddView = true;
      this.medicineName = scope.name;
      this.medicinePrice = scope.price;
      this.medicineLeftnumber = scope.leftnumber;
      this.medicineDesc = scope.short_desc;
      this.medicineId = scope.id;
      this.dialoadAddView= true
    }
  },

  mounted() {
    this.axios.get("api/getmedecine")
    .then(res=>{
      this.medicineList = res.data;
    });
  }
};
</script>
<style>
.dialog-addUser h3 {
  width: 100px;
  margin-bottom: 20px;
}
.el-select {
  width: 100%;
}
.el-table .inVaildRow {
    background: #f0b9b7 !important ;
  }
</style>
