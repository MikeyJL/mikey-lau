<style>
.code {
  font-size: .8rem;
  font-family: monospace;
  white-space: pre-wrap;
  white-space: moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word
}
.code .blue {
  color: blue
}
.code .green {
  color: green
}
.code .darkgreen {
  color: darkgreen
}
.code .purple {
  color: purple
}
.code .yellow {
  color: darkred
}
.code .orange {
  color: orange
}
</style>

<template>
  <div v-html="processedCode" class="code"/>
</template>

<script>
export default {
  props: {
    code: String,
    language: String
  },
  data () {
    return {
      processedCode: null,

      // Regex
      javascriptRegexList: [
        {
          name: 'class',
          regex: /(class|struct) (\w+)/g,
          classes: ['', 'blue', 'green']
        },
        {
          name: 'instance',
          regex: /([A-Z][a-z1-9]+)\.(\w+)/g,
          classes: ['', 'green', 'yellow']
        },
        {
          name: 'declaration',
          regex: /(return|import) (\w+)/g,
          classes: ['', 'purple', '']
        },
        {
          name: 'declaration',
          regex: /(const|let|var) (\w+)/g,
          classes: ['', 'blue', '']
        },
        {
          name: 'this',
          regex: /(this).\w/g,
          classes: ['', 'blue']
        },
        {
          name: 'declaration_functions',
          regex: /(constructor|for)\s?(\(.*?\))/g,
          classes: ['', 'blue', '']
        },
        {
          name: 'functions',
          regex: /\.?(\w+)\s*?\(/g,
          classes: ['', 'yellow', '']
        },
        {
          name: 'comments',
          regex: /[^:](\/\/.+)/g,
          classes: ['', 'darkgreen', '']
        }
      ]
    }
  },
  created () {
    this.processCode()
  },
  watch: {
    code () {
      this.processCode()
    }
  },
  methods: {
    processCode () {
      this.processedCode = this.code
      switch (this.language) {
        case 'javascript':
          this.javascript()
      }
    },
    javascript () {
      let finder
      this.processedCode = this.processedCode.replace(/null/g, '<span class="blue">null</span>')
      this.javascriptRegexList.forEach(listItem => {
        while ((finder = listItem.regex.exec(this.processedCode)) !== null) {
          if (finder.index === listItem.regex.lastIndex) {
            listItem.regex.lastIndex++
          }
          let oldCode
          let syntaxedCode
          finder.forEach((match, groupIndex) => {
            if (groupIndex === 0) {
              oldCode = match
              syntaxedCode = match
            } else {
              syntaxedCode = syntaxedCode.replace(match, `<span class="${listItem.classes[groupIndex]}">${match}</span>`)
            }
          })
          this.processedCode = this.processedCode.replace(oldCode, syntaxedCode)
        }
      })
    }
  }
}
</script>