<template>

    <!--
    <div id="drag-1" class="draggable">
      <p>You can drag one element</p>
    </div>
    <div id="drag-2" class="draggable">
      <p>with each pointer</p>
    </div>
    -->
    <v-container>
      <div class="parent moving-area" id="move" ref="move">
        <v-row no-gutters  class="pb-2 m" justify="center">
          <v-col cols="6" class="white pl-1 pr-1 jus" tile>
            <v-responsive :aspect-ratio="16/9">
              <div class="label" id="A">
                A
              </div>
            </v-responsive>
          </v-col>
          <v-col cols="6" class="white pl-1 pr-1 jus" tile>
            <v-responsive :aspect-ratio="16/9">
              <div class="label" id="B">
                B
              </div>
              <div class="label" id="D">
                D
              </div>
            </v-responsive>
          </v-col>
        </v-row>
        <v-row no-gutters class="pb-2 m" justify="center">
          <v-col cols="6" class="white pl-1 pr-1 jus" tile>
            <v-responsive :aspect-ratio="16/9">
            </v-responsive>
          </v-col>
          <v-col cols="6" class="white pl-1 pr-1 jus" tile>
            <v-responsive :aspect-ratio="16/9">
              <div class="label" id="C">
                C
              </div>
            </v-responsive>
          </v-col>
        </v-row>
        <!--
        <div id="drag-1" class="draggable">
          <p>You</p>
        </div>
        <div id="drag-2" class="draggable">
          <p>with</p>
        </div>
        -->
      </div>
      <!--
      <v-row no-gutters v-for="i in 2" :key="i" class="pb-2" justify="center">
          <v-col v-for="j in 2" :key="j" cols="5" class="mr-2 white" tile>
            <v-responsive :aspect-ratio="16/9">
              ああああ
            </v-responsive>
          </v-col>
      </v-row>
      -->

      <div v-for="item in items" :key="item.title" class="quo draggable" :id="item.title" :style="moveStyle(item.title)" :ref="'card' + item.title">
        <v-responsive :aspect-ratio="16/9">
          <div>
              <p>{{ item.title }}</p>
          </div>
        </v-responsive>
      </div>
    </v-container>
    <!--
        -->
</template>

<script>
import interact from "interactjs";
export default {
  name: "InteractJsTrial",
  data() {
    return {
      items: [
        { title: "title1", x: 0, y: 0 },
        { title: "title2", x: 0, y: 0 },
      ],
      width: 0,
      height: 0
    };
  },
  mounted: function() {
    interact('.draggable')
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.querySelector('#move'),
          endOnly: true
        })
        ],
        // enable autoScroll
        autoScroll: false,

        listeners: {
          // call this function on every dragmove event
          move: this.dragMoveListener,
        }
      });
      this.width = this.$refs.move.getBoundingClientRect().width;
      this.height = this.$refs.move.getBoundingClientRect().height;
      console.log("pppppp");
      console.log(this.width);
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy: function() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        dragMoveListener: function(event) {
            var key = event.target.id
            console.log(event.target);
            var item = this.items.find(item=>item.title===key)
            // keep the dragged position in the data-x/data-y attributes
            // console.log(item.x);
            // console.log(item.y);
            // console.log("-----------")
            // let index = "card" + key
            /*
            let width = this.$refs[index].getBoundingClientRect().width;
            let height = event.target.height;
            */
           /*
            let width = event.target.offsetWidth;
            let height = event.target.offsetHeight;
            console.log(width);
            console.log(height);
            */
            let dxs = event.dx/this.width;
            let dys = event.dy/this.height;
            item.x = (parseFloat(item.x)) + dxs;
            item.y = (parseFloat(item.y)) + dys;
            // console.log(item.x);
            // console.log(item.y);
        },
        handleResize: function() {
          this.width = this.$refs.move.getBoundingClientRect().width;
          this.height = this.$refs.move.getBoundingClientRect().height;
          // console.log(this.width);
          // console.log(this.height);
        }
    },
    computed: {
        moveStyle: function() {
            return function(key) {
                var item = this.items.find(item=>item.title===key)
                // console.log(item);
                console.log("ok");
                console.log(item.x);
                console.log(item.y);
                return {
                    transform: 'translate('+this.width*item.x+'px,'+this.width*item.y+'px)'
                }
            }
        }
    }
}

// target elements with the "draggable" class

// this function is used later in the resizing and gesture demos
// window.dragMoveListener = dragMoveListener
/*
interact(".draggable").draggable({
  // enable inertial throwing
  inertia: true,
  // keep the element within the area of it's parent
  modifiers: [
    interact.modifiers.restrictRect({
      restriction: ".moving-area",
      endOnly: true,
    }),
  ],
  // enable autoScroll
  autoScroll: true,

  listeners: {
    // call this function on every dragmove event
    move: dragMoveListener,

    // call this function on every dragend event
    end(event) {
      var textEl = event.target.querySelector("p");

      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    },
  },
});

function dragMoveListener(event) {
  var target = event.target;
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  // translate the element
  target.style.transform = "translate(" + x + "px, " + y + "px)";

  // update the posiion attributes
  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;
*/
</script>
<style scoped>
#title1,
#title2 {
  /*width: 25%;*/
  /*min-height: 6.5em;*/
  margin: 1rem 0 0 1rem;
  background-color: #29e;
  color: white;
  border-radius: 0.75em;
  padding: 4%;
  touch-action: none;
  user-select: none;
  right: 304px;
  bottom: -284px;
  transform: translate(0px, 0px);
  z-index: 100;
}
.child{
  position: absolute;
}
.parent {
  position:relative;
}
.label {
  position: absolute;
}
#A {
  bottom: 0px;
  left: 0px;
}
#B {
  bottom: 0px;
  right: 0px;
}
#C {
  bottom: 0px;
  left: 0px;
}
#D {
  left: 0px;
}
.top-bottom {
  z-index: 10;
}
.second-bottom {
  z-index: 20;
}
.third-bottom {
  z-index: 30;
}
.m {
  margin-right: -4px!important;
}
.jus {
  background-clip: content-box;
}
.quo {
  width: 25%;
}
</style>
