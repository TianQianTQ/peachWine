<template>
  <div class='container'>
      <div class='select'>
        <ul>
          <li
            class='selectItem'
            v-for="(item, index) in selectItem"
            :key = index
            draggable="true"
            @dragstart="dragStart($event, item)"
          >
            {{item.name}}
          </li>
        </ul>
      </div>
      <div class='end'>
        <ul>
        <li
          class='endItem'
          v-for="(item, index) in season"
          :key = index
          @drop = 'drop($event)'
          @dragover = 'dragOver($event)'
        >
          {{item.name}}
        </li>
      </ul>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      selectItem: [
        {
          id: 1,
          name: '橘子'
        }, {
          id: 2,
          name: '香蕉'
        }, {
          id: 3,
          name: '柚子'
        }, {
          id: 4,
          name: '李子'
        }
      ],
      season: [
        {
          id: 1,
          name: '春天'
        }, {
          id: 2,
          name: '夏天'
        }, {
          id: 3,
          name: '秋天'
        }, {
          id: 4,
          name: '冬天'
        }
      ],
      dom: ''
    }
  },
  mounted: function () {
    this.$nextTick(function () {

    })
  },
  watch: {
    selectItem: {
      handler: function (val, oldval) {

      },
      deep: true
    },
    season: {
      handler: function (val, oldval) {

      },
      deep: true
    }
  },
  methods: {
    dragStart (event) {
      console.log('拖拽开始')
      this.dom = event.currentTarget
      console.log(event.currentTarget)
    },
    drop (event) {
      // event.preventDefault()
      event.target.appendChild(this.dom)
    },
    dragOver (event) {
      event.preventDefault()
    }

  }
}
</script>
<style scoped>
.container{
  margin: 0 auto;
}
.select ul, .end ul{
  display: flex;
  align-items: center;
  justify-content: center;
}
.select{
  margin-bottom: 100px;
}
.selectItem{
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: cadetblue;
  text-align:center;
  cursor: pointer;
  margin: 0 30px;
  list-style-type:none;
}
.endItem{
  width: 100px;
  height: 100px;
   line-height: 100px;
  border:1px solid cadetblue;
  margin: 0 30px;
  list-style-type:none;
}
/* .end ul li li{
  width: 50px;
  height: 50px;
  line-height: 50px;
  background: cadetblue;
  text-align:center;
  list-style-type:none;
} */
[v-cloak]{
    display:none;
}
</style>
