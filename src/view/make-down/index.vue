<template>
  <div class="main">
    <div class="header">
      <div class="title-panel">MD在线编辑器</div>
      <div class="button-panel">
        <el-input
          v-model="fileName"
          class="title-input"
          placeholder="请输入文件名称进行保存"
        ></el-input>
        <el-button type="primary" @click="saveFile">保存</el-button>
      </div>
    </div>
    <div class="content">
      <div class="left" ref="leftScroll">
        <el-input
          ref="mdText"
          type="textarea"
          class="text-area"
          v-model="textarea"
          @scroll="changeLeftScroll()"
        >
        </el-input>
      </div>
      <div class="right" ref="rightScroll" @scroll="changeRightScroll()">
        <div id="cnblogs_post_body" v-html="htmlValue"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import { saveAs } from "file-saver";
import { toRaw } from "@vue/reactivity";
export default {
  name: "makeDown",
  data() {
    return {
      textarea: "",
      htmlValue: "",
      fileName: "",
    };
  },
  created() {
    this.$nextTick(() => {
      this.$refs.mdText && this.$refs.mdText.focus();
    });
  },
  methods: {
    saveFile() {
      if (this.fileName === "") {
        this.$message.warning("输入文件名称");
        return;
      }
      if (this.textarea === "") {
        this.$message.warning("内容不得为空");
      }
      let str = new Blob([this.textarea], { type: "text/plain;charset=utf-8" });
      saveAs(str, this.fileName + ".txt");
    },
    changeLeftScroll() {
      let textScrollTop = toRaw(this.$refs.mdText.$refs.textarea.scrollTop);
      this.$refs.rightScroll.scrollTop = textScrollTop;
    },
    changeRightScroll() {
      this.$refs.mdText.$refs.textarea.scrollTop =
        this.$refs.rightScroll.scrollTop;
    },
  },
  watch: {
    textarea: {
      deep: true,
      handler(newVal) {
        this.htmlValue = marked.parse(newVal);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;
}
.header {
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 0px 200px 0px 200px;
  border-bottom-style: solid;
  border-color: #272727;
  border-width: 1px;
  & > div {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.title-panel {
  font-size: 20px;
}
.button-panel {
  display: flex;
  & > div {
    margin-right: 20px;
  }
}
.content {
  height: calc(100vh - 52px);
  display: flex;
  justify-content: space-between;
}

.left {
  width: 50%;
  padding: 5px;
  border: 1px solid #272727;
  margin: 5px;
  overflow: auto;
}
.text-area {
  height: 100%;

  ::v-deep .el-textarea__inner {
    height: 100% !important;
  }
}
.right {
  width: 50%;
  padding: 5px;
  border: 1px solid #272727;
  margin: 5px;
  overflow: auto;
}
</style>
