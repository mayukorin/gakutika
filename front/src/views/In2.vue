<template>
  <v-container>
    <div class="parent" id="moving-area">
      <v-row no-gutters  class="x-axis" justify="center">
        <v-col cols="6" class="white y-axis clip-change" tile>
          <v-responsive :aspect-ratio="16/9">
            <div class="label" id="A">
              A
            </div>
          </v-responsive>
        </v-col>
        <v-col cols="6" class="white y-axis clip-change" tile>
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
      <v-row no-gutters class="x-axis" justify="center">
        <v-col cols="6" class="white y-axis clip-change" tile>
          <v-responsive :aspect-ratio="16/9">
          </v-responsive>
        </v-col>
        <v-col cols="6" class="white y-axis clip-change" tile>
          <v-responsive :aspect-ratio="16/9">
            <div class="label" id="C">
              C
            </div>
          </v-responsive>
        </v-col>
      </v-row>
    </div>
    <div>
      <div v-for="item in items" :key="item.id" class="gakutika-card draggable" :id="item.id" :style="moveStyle(item.id)" :ref="'gakutika'+item.id">
        <v-responsive :aspect-ratio="16/9">
          <div>
              <p>{{ item.title }}</p>
          </div>
        </v-responsive>
      </div>
    </div>
  </v-container>
</template>

<script>
import interact from "interactjs";
export default {
  name: "In2",
  data() {
    return {
      items: [
        { id: 1, title: "title1", x_rate: 0, y_rate: 0 },
        { id: 2, title: "title2", x_rate: 0, y_rate: 0 },
      ],
    };
  },
  mounted: function() {
    this.items[1].x_rate = 0.5;
    interact('.draggable')
      .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
        interact.modifiers.restrictRect({
          restriction: document.querySelector('#moving-area'),
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
    },
    methods: {
        dragMoveListener: function(event) {
            let key = Number(event.target.id)
            let item = this.items.find(item=>item.id===key)
            let width = event.target.offsetWidth;
            let height = event.target.offsetHeight;
           
            let dxs = event.dx/width;
            let dys = event.dy/height;
            console.log(item);
            item.x_rate = (parseFloat(item.x_rate)) + dxs;
            item.y_rate = (parseFloat(item.y_rate)) + dys;
        },
    },
    computed: {
        moveStyle: function() {
            return function(str_key) {
                let key = Number(str_key)
                let item = this.items.find(item=>item.id===key)
                return {
                    transform: 'translate('+item.x_rate*100+'%,'+item.y_rate*100+'%)'
                }
            }
        }
    }
}

</script>
<style scoped>

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
.clip-change {
  background-clip: content-box;
}
.gakutika-card {
  width: 25%;
  background-color: #29e;
  color: white;
  border-radius: 0.75em;
  padding: 4%;
  touch-action: none;
  user-select: none;
  /*transform: translate(0%, 0%);*/
  z-index: 100;
}
.x-axis {
  padding-bottom: 8px!important;
}
.y-axis {
  padding-left: 4px!important;
  padding-right: 4px!important;
}
</style>
