
<template>
  <Layout>
    <div class="main">
       <h1 style="text-align: center" class="project-title">Mi Portfolio</h1>

      <!-- Github link -->
      <p style="text-align: center">
        <a href="https://github.com/Omar-Pecos" target="_blank">
          <g-image
            width="50"
            src="~/assets/images/github.png"
            alt="GitHub"
          ></g-image>
        </a>
      </p>

      <!-- Slider -->
     <VueSlickCarousel v-bind="settings">
        <div v-for="project of $page.projects.edges" :key="project.node.id">
            <div>
                <div
                class="repo-card-div"
                @click="() => projectDisplayed = project.node"
              >
                <div 
                  class="repo-name-div"
                >
                  <svg
                    aria-hidden="true"
                    height="20"
                    role="img"
                    viewBox="0 0 12 16"
                    width="14"
                    class="repo-svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                    ></path>
                  </svg>
                  <p class="repo-name" :style=" styleTechName(project.node.type) ">{{project.node.name}}</p>
                </div>
                <p class="repo-description-clip">{{project.node.description}}</p>
              
                <div class="repo-stats">
                  <div class="repo-left-stat">
                      <!-- Techs display -->
                      <div>
                          <div class="software-skills-main-div">
                              <ul class="dev-icons">
                            
                                  <li class="software-skill-inline" v-for="tech in project.node.techs"  v-bind:key="tech._id">
                                      <img width="30" :src="tech.icon" :alt="tech.name">
                                      <p :style=" styleTechName(tech.type) ">{{tech.name}}</p>
                                  </li>
                                
                              </ul>
                          </div>
                      </div>
                  </div>
                  <div class="repo-right-stat">
                    <span>{{project.node.type.toUpperCase()}}</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </VueSlickCarousel>

      <!-- Project Detail -->
        <div v-if="projectDisplayed">
           <div
          class="repo-card-div"
          :key="projectDisplayed.id"
        >
          <div 
            class="repo-name-div"
            @click="openRepoinNewTab(projectDisplayed.url)"
           >
            <svg
              aria-hidden="true"
              height="20"
              role="img"
              viewBox="0 0 12 16"
              width="14"
              class="repo-svg"
            >
              <path
                fill-rule="evenodd"
                d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
              ></path>
            </svg>
            <p class="repo-name" :style=" styleTechName( projectDisplayed.type ) ">{{projectDisplayed.name}}</p>
          </div>
          <p class="repo-description-detail">{{projectDisplayed.description}}</p>

          <p v-if="projectDisplayed.images.length > 0" style="text-align:center;">  
              <span @click="changeImageVisibility( seeingImages )">Ver Imágenes </span>
          </p>
          <!-- Display Images -->
          <div class="image-div"  v-if="seeingImages">

            <span   v-for="image of projectDisplayed.images" v-bind:key="image" class="fitImage">
              <g-image :src="image" style="height: 150px"></g-image>
            </span>
            
          </div>

          <p v-if="projectDisplayed.files.length > 0" style="text-align:center;">  
              <span @click="() => seeingFiles = !seeingFiles">Ver Archivos </span>
          </p>
           <!-- Display Files -->
          <div class="image-div"  v-if="seeingFiles">

            <span   v-for="(file,index) of projectDisplayed.files" v-bind:key="file" @click="openRepoinNewTab(file)"
             style="padding:2px 5px;border : 2px solid black;borderRadius:30px;" >
              Archivo {{index + 1}}
            </span>
            
          </div>

          <div class="repo-stats">
            <div class="repo-left-stat">
                 <!-- Techs display -->
                <div>
                    <div class="software-skills-main-div">
                        <ul class="dev-icons">
                       
                            <li class="software-skill-inline" v-for="tech in projectDisplayed.techs"  v-bind:key="tech._id">
                                <img width="30" :src="tech.icon" :alt="tech.name">
                                <p :style=" styleTechName( tech.type ) ">{{tech.name}}</p>
                            </li>
                           
                        </ul>
                    </div>
                </div>
            </div>
            <div class="repo-right-stat">
              <span>{{projectDisplayed.type.toUpperCase()}}</span>
            </div>
          </div>
        </div>
        </div>
    </div>
  </Layout>
</template>

<page-query>
query {
   projects : allProject( order : ASC){
    edges{
      node{
        id
        name
        type
        description
        url
        techs{
          _id
          name
          type
          icon
        }
        images
        files
        pinned
      }
    }
  }
}
</page-query>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  data(){
    return {
      projectDisplayed : null,
      seeingImages : false,
      seeingFiles: false,
      settings : {
       "dots": true,
      "infinite": true,
      "speed": 500,
      "slidesToShow": 4,
      "slidesToScroll": 4,
      "initialSlide": 0,
      "adaptiveHeight": true,
      "responsive": [
            {
              "breakpoint": 1024,
              "settings": {
                "slidesToShow": 3,
                "slidesToScroll": 3,
                "infinite": true,
                "dots": true
              }
            },
            {
              "breakpoint": 600,
              "settings": {
                "slidesToShow": 2,
                "slidesToScroll": 2,
                "initialSlide": 2
              }
            },
            {
              "breakpoint": 480,
              "settings": {
                "slidesToShow": 1,
                "slidesToScroll": 1
              }
            }
      ]
      }
    }
  },
  components: {
   VueSlickCarousel
  },
  methods:{
     styleTechName(type){
          var color = 'black';
          switch(type){
            case 'backend':
            color = '#C64E4E';
            break;
            case 'frontend':
            color = '#47C163';
            break;
            case 'design':
            color = '#808080';
            break;
            case 'game':
            color = 'orange';
            break;
            case 'native':
            color = 'plum';
            break;
            case 'hybrid':
            color = '#3F3FB6';
            break;
          }

            return {
              color
            }
      },
      openRepoinNewTab( url ){
          if (url)
            window.open(url,'_blank');
      },
      changeImageVisibility( value ){
        this.seeingImages = !value;
      }
  }
};
</script>

<style>
.main {
  width: 90%;
  padding: 20px 10px;
  margin: 0px auto;
  margin-top: 1rem;
}
.repo-card-div {
  color: rgb(88, 96, 105);
  background-color: rgb(255, 255, 255);

 border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 2rem;
  cursor: pointer;
}

.repo-stats {
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;

  flex-direction: column;
  
  font-size: 13px;
  color: rgb(106, 115, 125);
}

.repo-left-stat {
  -webkit-box-flex: 1;
  flex-grow: 1;
  display: flex;
}

.repo-right-stat {
  display: flex;
  align-items: flex-end;
}

.language-color {
  width: 10px;
  height: 10px;
  background-color: blue;
  margin-right: 0.25rem;
  border-radius: 100%;
}

.repo-left-stat span {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.75rem;
}

.repo-name-div {
  display: flex;
  align-items: center;
}

.repo-svg {
  margin-right: 0.5rem;
  min-width: 16px;
}

.repo-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  color: rgb(36, 41, 46);
  margin-bottom: 0.75rem;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 0px;

 /* min-width: 80%;*/
}

.repo-star-svg {
  margin-right: 0.3rem;
}

.repo-description-clip {
  overflow: hidden;
  /* display: block;*/
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.repo-description-detail{
   overflow: hidden;
   display: block;
}


.dark-card-mode {
  background-color: #171c28 !important;
  color:white;
}
.dark-card-mode p {
  color:white;
}
.dark-card-mode:hover {
  background-color: #55198b !important;
}

/* Software skills */

.dev-icons {
  padding-left: 0;
  list-style: none;
  font-size: 3rem;
  margin-bottom: 0px;
  margin-top: 0px;
  text-align: center;
}

.software-skill-inline {
  display: inline-block;
  margin: 5px;
}

.software-skill-inline > i {
  color: #868e96;
}

.software-skill-inline > i:hover {
  color: #645beb;
}
.software-skill-inline > p {
  color: #868e96;
  font-size: 10px;
}
.software-skill-inline > i:hover ~ p{
  color: #645beb;
}

.slick-dots{
  position: unset;
}
.project-title {
  font-size: 40px;
  font-weight: 400;
  line-height: normal;
}

.image-div{
  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  justify-content: center
}

.fitImage{
  min-width: 150px;
  max-height: 150px;
  overflow: hidden;
}

.fitImage:hover{
  overflow: visible;
  transform: scale(1.3);
  position: relative;
  left: -1vw;
}

@media (min-width : 768px) {
   .fitImage:hover{
      transform: scale(2);
  }
}

</style>