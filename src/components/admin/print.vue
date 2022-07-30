<template>
    <div class>
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/admin/print' }">处方打印</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="content">
            <!-- 选择患者信息 -->
            <el-select
                v-model="patientchoose"
                filterable
                allow-create
                default-first-option
                placeholder="请选择患者">
                <el-option
                    v-for="item in patientList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                </el-option>
            </el-select>
            <el-table
                :data="medicine"
                style="width: 100%"
                border>
            <!-- <el-table-column
                    prop="id"
                    label="ID"
                    width="140px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.id" type="number"></el-input>
                </template>
            </el-table-column> -->

            <el-table-column
                    prop="name"
                    label="药物名称"
                    width="140px">
                <!-- <template slot-scope="scope">
                    <el-input v-model="scope.row.name" type="number"></el-input>
                </template> -->
                <template slot-scope="scope">
                    <el-select v-model="scope.row.name" filterable :filter-method="PinyinMatch" :popper-append-to-body="false" placeholder="选择药材">
                        <el-option
                            @change="medicineSelect(scope)"
                            v-for="item in medicineList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column
                    prop="usage"
                    label="药物用量"
                    width="150px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.usage" type="number"></el-input>
                </template>
            </el-table-column>

            <el-table-column
                    prop="price"
                    label="药物单价"
                    width="150px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.price" type="number"></el-input>
                </template>
            </el-table-column>

            <el-table-column>
                <template slot-scope="scope">
                    <button @click="addLine"
                            class="addBtn"
                            v-if="scope.$index == medicine.length - 1">
                        <i class="el-icon-plus"></i>
                    </button>

                    <button v-if="medicine.length > 1"
                            @click="handleDelete(scope.$index, scope.row)"
                            class="del-btn">
                        <i class="el-icon-minus"></i>
                    </button>
                </template>
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>



<script>
import PinyinMatch from 'pinyin-match'
export default {
  components: {},
  data() {
    return {
      medicineList:{},
      patientList:{},
      patientname: "",
      medicine:[{
                id: '',
                name: '',
                usage:'',
                price:''
            }]
    };
  },

  computed: {},
  watch: {},
  methods: {
        addLine(){ //添加行数
            this.save();
            var newValue = {
                id: '',
                name: '',
                usage:'',
                price:''
              };
            //添加新的行数
            this.medicine.push(newValue);
        },
        handleDelete(index){ //删除行数
            this.medicine.splice(index, 1)
        },
        save(){
          //这部分应该是保存提交你添加的内容
          console.log(JSON.stringify(this.medicine))
        },
        medicineSelect(scope){
            console.log(scope);
            scope.id = this.medicineList[scope.row.name].id;
        },
       PinyinMatch(val){
        if(val){
            let result = []
            console.log(this.copyCustomer);
            this.copyCustomer.forEach(i=>{
            let m = PinyinMatch.match(i.name,val) //name是要过滤的字段
            if (m) {
                result.push(i)
            }
            })
            this.customer = result
        }else{
            this.customer=this.copyCustomer
        }
        },

    },

  mounted() {
    this.axios.get("api/getmedecine")
    .then(res=>{
      this.medicineList = res.data;
    });
    this.axios.get("api/getpatient")
    .then(res=>{
      this.patientList = res.data;
    });
  }
};
</script>

<style scoped>
/deep/.el-select-dropdown {
    position: absolute !important;
    top: 50px !important;
    left: 0 !important;
 }
</style>