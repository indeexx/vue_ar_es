<template>
  <div class="hello">
    <div> {{msg}}</div>
    <ul>
    <li :class="listClass[index]" v-for="(item, index) in list" :key="index">
      {{item}}
    </li>
  </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private isClass: string = 'isClass0';
  private list: string[] = ['indeex', 'qiary', 'ecmascript']
  private listClass:string[] = [];
  private num: number = 0;

  mounted() {
    this.listClass = this.getClass();
  }
  private getClass():string[] {
    let nums : string[] = [];
    console.log(this.list)
    this.list.forEach((item: any, index: number) => {
      let classNum: string = 'isClass';
      classNum = classNum + index.toString();
      nums.push(classNum);
    })
    return nums;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.isClass0{
  background-color: rgb(219, 100, 213);
}
.isClass1{
  background-color: rgb(45, 211, 86);
}
.isClass2{
  background-color: rgb(218, 105, 53);
}
</style>
