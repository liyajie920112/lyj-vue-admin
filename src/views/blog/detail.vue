<template>
  <div class="blog-detail-wrapper">
    <div class="editor-tools" @click.prevent.stop="toolClick">
      <span
        class="editor-tool"
        :class="item.icon"
        v-for="item in tools"
        :key="item.title"
        :title="item.children && item.children.length ? item.title : ''"
        :data-v="item.value"
      >
      <div class="tool-children" v-if="item.children && item.children.length">
        <span :data-v="c.value" :title="c.title" class="tool" v-for="c in item.children" :key="c.title" v-text="c.title"></span>
      </div>
      </span>
    </div>
    <div class="blog-editor-box">
      <div class="blog-editor" id="editor"></div>
      <div v-if="showPreview" class="blog-editor-preview markdown" v-html="contentHtml"></div>
    </div>
  </div>
</template>

<script>
import * as monaco from 'monaco-editor'
import solarizedLight from 'monaco-themes/themes/Solarized-light.json'
import marked from 'marked'
import { getBlog, postBlog } from '@/api/blog'
export default {
  name: 'BlogDetail',
  data() {
    return {
      content: '',
      contentHtml: '',
      blogTags: '',
      blogid: '',
      showPreview: false,
      tools: [
        {
          icon: 'el-icon-view',
          title: '预览',
          value: 'preview'
        },
        {
          icon: 'el-icon-picture',
          title: '插入图片',
          value: 'insertimg'
        },
        {
          icon: 'el-icon-s-promotion',
          title: '发布',
          children: [{
            title: '发布',
            value: 'publish'
          }, {
            title: '存为草稿',
            value: 'draft'
          }]
        }
      ]
    }
  },
  created() {
    this.customMarkdownRender = this.customMarkdownRender()
    monaco.editor.defineTheme('solarized-light', solarizedLight)
  },
  methods: {
    async getBlog() {
      const params = this.$route.params
      console.log('t', params)
      if (!params.id) {
        return
      }
      this.blogid = params.id
      const r = await getBlog({ id: params.id })
      this.editor.setValue(r.data.blogContent)
    },
    createEditor() {
      this.editor = monaco.editor.create(document.getElementById('editor'), {
        value: this.content,
        language: 'markdown',
        fontSize: 16,
        wordWrap: 'on',
        theme: 'solarized-light'
      })
      this.editor.onDidChangeModelContent(e => {
        this.content = this.editor.getValue()
        this.contentHtml = marked(this.content, { renderer: this.customMarkdownRender })
      })
    },
    resizeEditor() {
      this.editor.layout()
    },
    toolClick(e) {
      const v = e.target.getAttribute('data-v')
      if (!v) {
        return
      }
      if (v === 'preview') {
        this.showPreview = !this.showPreview
        this.$nextTick(() => {
          this.resizeEditor()
        })
      } else if (v === 'publish' || v === 'draft') {
        const isPublish = v === 'publish'
        // 发布
        const info = this.parseMd()
        if (!info) {
          return
        }
        const params = {
          title: info.title,
          desc: info.desc,
          tags: this.blogTags,
          blogContent: this.content,
          status: isPublish ? 2 : 1
        }
        if (this.blogid) {
          params.id = this.blogid
        }
        postBlog(params).then(res => {
          console.log('res', res)
          this.blogid = res.data.id
          this.$message.success(res.msg || '保存成功')
        })
      }
    },
    customMarkdownRender() {
      // Get reference
      const renderer = new marked.Renderer()

      // Override function
      renderer.paragraph = (text) => {
        const prefix = '::: tags\n'
        if (text.startsWith(prefix)) {
          const v = text.slice(prefix.length).replace('\n:::', '')
          this.blogTags = v.trim()
          const tags = v.split(',')
          const tagsHtml = []
          tags.forEach(tag => {
            tagsHtml.push(`<span class="tag">${tag}</span>`)
          })
          return `<p class="tags">${tagsHtml.join('')}</p>`
        } else if (text.startsWith('<img')) {
          return `<p class="image">${text}</p>`
        }
        return `<p>${text}</p>`
      }
      return renderer
    },
    parseMd() {
      const obj = {
        title: '',
        desc: ''
      }
      const tokens = marked.lexer(this.content)
      console.log('tokens', tokens)
      const titleObj = tokens.find(a => a.type === 'heading' && a.depth === 1)
      if (!titleObj) {
        alert('请添加博客标题')
        return null
      }
      const descs = tokens.filter(a => a.type === 'paragraph' && !a.text.startsWith('![') && !a.text.startsWith('::: tags\n'))
      if (descs && descs.length) {
        descs.some(a => {
          obj.desc += a.text
          return obj.desc.length >= 140
        })
      }
      obj.title = titleObj.text
      return obj
    },
    addWindowResize() {
      window.addEventListener('resize', this.resizeEditor, false)
    }
  },
  beforeDestroy() {
    this.editor.dispose()
    window.removeEventListener('resize', this.resizeEditor, false)
  },
  activated() {
    // 获取博客内容
    this.getBlog()
  },
  mounted() {
    this.createEditor()
    this.addWindowResize()
  }
}
</script>

<style lang="scss">
@import '../../styles/markdown.scss';
</style>
<style lang="scss" scoped>
.blog-detail-wrapper {
  position: fixed;
  top: 84px;
  bottom: 0;
  left: 210px;
  right: 0;
  background-color: #fff;
  z-index: 11;
  display: flex;
  flex-direction: column;
  .editor-tools {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 30px;
    background-color: #fdf6e3;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    padding: 0 74px;
    .editor-tool {
      position: relative;
      display: inline-block;
      height: 100%;
      line-height: 30px;
      padding: 0 8px;
      cursor: pointer;
      color: #ddd;
      transition: all 0.3s;
      .tool-children {
        display: none;
      }
      &:hover {
        background-color: #ddd;
        color: #fdf6e3;
        .tool-children {
          display: block;
          position: absolute;
          font-size: 12px;
          top: 100%;
          left: 0;
          z-index: 20;
          white-space: nowrap;
          background-color: #ddd;
          padding: 5px 0;
          .tool {
            display: block;
            color: #fdf6e3;
            padding: 3px 10px;
            &:hover {
              background-color: #ccc;
              color: #fff;
            }
          }
        }
      }
    }
  }
  .blog-editor-box {
    flex: 1;
    display: flex;
    flex-direction: row;
    height: calc(100% - 30px);
    .blog-editor {
      flex: 1;
      width: 50%;
    }
    .blog-editor-preview {
      flex: 1;
      width: 50%;
      padding: 0 10px;
      // background-color: #fdf6e3;
      overflow-y: scroll;
    }
  }
}
</style>
