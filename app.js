var vue = new Vue({
  el: '#app',
  data: {
    nodes: [],
    path: '/',
    value: '',
  },
  ready: function() {
    this.fetch();
  },
  methods: {
    fetch: function() {
      let url = '/api/v1/nodes/' + this.path;
      this.$http.get(url).then(function (response) {
      // set data on vm
      let data = response.json();
      this.$set('path', this.cleanPath(data.fullpath));
      this.$set('value', data.value);
      this.$set('nodes', data.children);
      })
    },
    viewNodeEvent: function(node) {
      console.log(node);
      this.$set('path', this.cleanPath(node.fullpath));
      this.$set('value', '');
      this.$set('nodes', []);
      this.fetch();
    },
    viewUpNodeEvent: function(path) {
      path = this.cleanPath(path);
      console.log(path);
      let upPath = path.split('/').slice(0, -1).join('/');
      console.log(upPath);
      if (upPath === ''){
        upPath = '/';
      }
      this.$set('path', upPath);
      this.$set('value', '');
      this.$set('nodes', []);
      this.fetch();
    },
    cleanPath: function(path) {
      if (!path.startsWith('/')) {
        path = '/' + path;
      }
      let nodeSlice = path.split('/');
      let newSlice = [];
      nodeSlice.map(function (element) {
        if (element !== '') {
          newSlice.push(element);
        }
      });
      return '/' + newSlice.join('/')
    }
  }
})
