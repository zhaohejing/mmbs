<template>
  <el-menu :default-active="defaultActive" router class="el-menu-vertical" :collapse="extend">

      <template v-for="(item,index) in data">
        <el-menu-item v-if="item.children == null || item.children.length == 0" :index="item.attributes.url" class="custom-submenu">
          <i :class="item.attributes.icon || ''"></i>
          {{item.label}}
        </el-menu-item>
        <el-submenu :index="index" v-if="item.children && item.children.length" class="custom-submenu">
          <template slot="title">
            <i :class="item.attributes.icon || ''"></i>
            <span v-text="item.label"></span>
          </template>

          <el-menu-item v-for="child in item.children" :index="child.attributes.url" class="custom-submenu">
            <i :class="child.attributes.icon || ''"></i>
            {{child.label}}
          </el-menu-item>
        </el-submenu>
      </template>


  </el-menu>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    extend: {
      type: Boolean,
      default: false
    },
    defaultActive: {
      type: String,
      default() {
        return "";
      }
    },
    theme: {
      type: String
    }
  },
  created() {}
};
</script>
