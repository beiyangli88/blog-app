<template>
  <div>
    <!-- banner -->
    <div class="banner" :style="cover">
      <h1 class="banner-title">关于我</h1>
    </div>
    <!-- 关于我内容 -->
    <v-card class="blog-container">
      <!-- 博主头像 -->
      <!-- <div class="my-wrapper">
        <v-avatar size="110">
          <img class="author-avatar" :src="avatar" />
        </v-avatar>
      </div> -->
      <div class="author-main">
        <div class="author-box">
          <span></span>
          <div class="author-img">
            <img :src="avatar" />
          </div>
        </div>
        <div class="image-dot"></div>
      </div>
      <!-- 介绍 -->
      <div
        ref="about"
        class="about-content markdown-body"
        v-html="aboutContent"
      />
    </v-card>
  </div>
</template>

<script>
import Clipboard from "clipboard";
import markdownToHtml from "../../utils/markdown";
export default {
  created () {
    this.getAboutContent();
  },
  destroyed () {
    this.clipboard.destroy();
  },
  data: function () {
    return {
      aboutContent: "",
      clipboard: null,
      imgList: []
    };
  },
  methods: {
    getAboutContent () {
      const that = this;
      this.axios.get("/api/about").then(({ data }) => {
        this.aboutContent = markdownToHtml(data.data);
        this.$nextTick(() => {
          // 添加代码复制功能
          this.clipboard = new Clipboard(".copy-btn");
          this.clipboard.on("success", () => {
            this.$toast({ type: "success", message: "复制成功" });
          });
          // 添加图片预览功能
          const imgList = this.$refs.about.getElementsByTagName("img");
          for (var i = 0; i < imgList.length; i++) {
            this.imgList.push(imgList[i].src);
            imgList[i].addEventListener("click", function (e) {
              that.previewImg(e.target.currentSrc);
            });
          }
        });
      });
    },
    previewImg (img) {
      this.$imagePreview({
        images: this.imgList,
        index: this.imgList.indexOf(img)
      });
    }
  },
  computed: {
    avatar () {
      return this.$store.state.blogInfo.websiteConfig.websiteAvatar;
    },
    cover () {
      var cover = "";
      this.$store.state.blogInfo.pageList.forEach(item => {
        if (item.pageLabel == "about") {
          cover = item.pageCover;
        }
      });
      return "background: url(" + cover + ") center center / cover no-repeat";
    }
  }
};
</script>

<style scoped>
.about-content {
  word-break: break-word;
  line-height: 1.8;
}
.my-wrapper {
  text-align: center;
}
.author-avatar {
  transition: all 0.5s;
}
.author-avatar:hover {
  transform: rotate(360deg);
}
</style>

<style lang="scss">
pre.hljs {
  padding: 12px 2px 12px 40px !important;
  border-radius: 5px !important;
  position: relative;
  font-size: 14px !important;
  line-height: 22px !important;
  overflow: hidden !important;
  &:hover .copy-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  code {
    display: block !important;
    margin: 0 10px !important;
    overflow-x: auto !important;
    &::-webkit-scrollbar {
      z-index: 11;
      width: 6px;
    }
    &::-webkit-scrollbar:horizontal {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      width: 6px;
      background: #666;
    }
    &::-webkit-scrollbar-corner,
    &::-webkit-scrollbar-track {
      background: #1e1e1e;
    }
    &::-webkit-scrollbar-track-piece {
      background: #1e1e1e;
      width: 6px;
    }
  }
  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 12px;
    bottom: 12px;
    left: 0;
    font-size: 100%;
    width: 40px;
    text-align: center;
    letter-spacing: -1px;
    border-right: 1px solid rgba(0, 0, 0, 0.66);
    user-select: none;
    counter-reset: linenumber;
    span {
      pointer-events: none;
      display: block;
      counter-increment: linenumber;
      &:before {
        content: counter(linenumber);
        color: #999;
        display: block;
        text-align: center;
      }
    }
  }
  b.name {
    position: absolute;
    top: 7px;
    right: 45px;
    z-index: 1;
    color: #999;
    pointer-events: none;
  }
  .copy-btn {
    position: absolute;
    top: 6px;
    right: 6px;
    z-index: 1;
    color: #ccc;
    background-color: #525252;
    border-radius: 6px;
    display: none;
    font-size: 14px;
    width: 32px;
    height: 24px;
    outline: none;
  }
}

.author-main {
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
}
.author-box {
  position: relative;
  width: 189px;
  height: 189px;
  background: rgba(253, 253, 253);
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.author-img {
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
  width: 180px;
  height: 180px;
  z-index: 10;
}
.author-img img {
  max-width: 100%;
}
.author-main .image-dot {
  width: 25px;
  height: 25px;
  background: #6bdf8f;
  position: relative;
  border-radius: 50%;
  border: 6px solid rgba(253, 253, 253);
  top: 150px;
  right: 45px;
  z-index: 20;
}
.author-box::before {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background-image: conic-gradient(
    transparent,
    transparent,
    transparent,
    #8758ff
  );
  animation: animate 4s linear infinite;
  animation-delay: -2s;
}
.author-box::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background-image: conic-gradient(
    transparent,
    transparent,
    transparent,
    #5cb8e4
  );
  animation: animate 4s linear infinite;
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.author-box span {
  position: absolute;
  inset: 5px;
  border-radius: 50%;
  background: rgba(253, 253, 253);
  z-index: 1;
}
</style>
