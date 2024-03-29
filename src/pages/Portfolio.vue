<template>
  <Layout>
    <div class="main">
      <h1
        style="text-align: center; margin-bottom: 10px;"
        class="project-title"
      >
        {{ $t("Portfolio.my_portfolio") }}
      </h1>
      <!-- Github link -->
      <div style="text-align: center">
        <a href="https://github.com/Omar-Pecos" target="_blank">
          <g-image
            width="50"
            src="~/assets/images/github.png"
            alt="GitHub"
          ></g-image>
        </a>
      </div>

      <div class="types">
        <span
          style="font-weight:bold;margin-right:10px;"
          :class="{ typeActive: typeSearched === 'ALL' }"
          @click="() => (typeSearched = 'ALL')"
          >{{ $t("Portfolio.all_types") }}</span
        >
        <span
          v-for="type of TYPES"
          :key="type"
          :style="styleTechName(type, 'type')"
          :class="{ typeActive: typeSearched === type }"
          @click="() => (typeSearched = type)"
          >{{ type.toUpperCase() }}</span
        >
      </div>

      <!-- Slider -->
      <VueSlickCarousel v-bind="settings">
        <div
          v-for="project of getProjectsByType(typeSearched)"
          :key="project.node.id"
        >
          <div>
            <div
              :class="
                $store.state.darkMode ? 'repo-card-div-dark' : 'repo-card-div'
              "
              @click="() => (projectDisplayed = project.node)"
            >
              <div class="repo-name-div">
                <RepoLogo />
                <p
                  class="repo-name"
                  :style="styleTechName(project.node.type, 'title')"
                >
                  {{ project.node.name }}
                </p>
              </div>
              <p class="repo-description-clip">
                {{ project.node.description }}
              </p>
              <TranslateButton
                v-if="$i18n.locale !== 'es'"
                :text="project.node.description"
              />

              <div class="repo-stats">
                <div class="repo-left-stat">
                  <!-- Techs display -->
                  <div>
                    <div class="software-skills-main-div">
                      <ul class="dev-icons">
                        <li
                          class="software-skill-inline"
                          v-for="tech in project.node.techs"
                          v-bind:key="tech._id"
                        >
                          <img width="30" :src="tech.icon" :alt="tech.name" />
                          <p :style="styleTechName(tech.type, 'badge')">
                            {{ tech.name }}
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="repo-right-stat">
                  <span>{{ project.node.type.toUpperCase() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>

      <!-- Project Detail -->
      <div v-if="projectDisplayed">
        <div
          :class="
            $store.state.darkMode ? 'repo-card-div-dark' : 'repo-card-div'
          "
          :key="projectDisplayed.id"
        >
          <div
            class="repo-name-div"
            @click="openRepoinNewTab(projectDisplayed.url)"
          >
            <RepoLogo />
            <p
              class="repo-name"
              :style="styleTechName(projectDisplayed.type, 'title')"
            >
              {{ projectDisplayed.name }}
            </p>
            <HandCursorImg
              v-if="projectDisplayed.url"
              :rotation="-90"
              :styles="'margin-bottom:-7px;margin-left:10px;'"
            />
          </div>
          <p class="repo-description-detail">
            {{ projectDisplayed.description }}
          </p>
          <TranslateButton
            v-if="$i18n.locale !== 'es'"
            :text="projectDisplayed.description"
          />

          <div
            v-if="projectDisplayed.images.length > 0"
            style="text-align:center;padding: 10px 0"
          >
            <span @click="changeImageVisibility(seeingImages)"
              >{{ $t("Project_card.see_images") }}
            </span>
          </div>
          <!-- Display Images -->
          <div class="image-div" v-if="seeingImages">
            <span
              v-for="image of projectDisplayed.images"
              v-bind:key="image"
              class="fitImage"
            >
              <g-image :src="image"></g-image>
            </span>
          </div>

          <div
            v-if="projectDisplayed.files.length > 0"
            style="text-align:center;padding: 10px 0"
          >
            <span @click="() => (seeingFiles = !seeingFiles)"
              >{{ $t("Project_card.see_files") }}
            </span>
          </div>
          <!-- Display Files -->
          <div class="image-div" v-if="seeingFiles">
            <span
              v-for="(file, index) of projectDisplayed.files"
              v-bind:key="file"
              @click="openRepoinNewTab(file)"
              style="padding:2px 5px;border : 2px solid black;borderRadius:30px;"
            >
              {{ $t("Project_card.file") }} {{ index + 1 }}
            </span>
          </div>

          <div class="repo-stats">
            <div class="repo-left-stat">
              <!-- Techs display -->
              <div>
                <div class="software-skills-main-div">
                  <ul class="dev-icons">
                    <li
                      class="software-skill-inline"
                      v-for="tech in projectDisplayed.techs"
                      v-bind:key="tech._id"
                    >
                      <img width="30" :src="tech.icon" :alt="tech.name" />
                      <p :style="styleTechName(tech.type, 'badge')">
                        {{ tech.name }}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="repo-right-stat">
              <span>{{ projectDisplayed.type.toUpperCase() }}</span>
              <span v-if="projectDisplayed.repo_url">
                <a :href="projectDisplayed.repo_url" target="_blank">
                  <g-image
                    src="~/assets/images/github.png"
                    width="50"
                  ></g-image>
                </a>
              </span>
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
        repo_url
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
import TranslateButton from "~/components/TranslateButton.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import { setColorByType, TYPES } from "../utils";
import HandCursorImg from "../components/HandCursorImg.vue";
import RepoLogo from "../components/RepoLogo.vue";

export default {
  metaInfo: {
    title: "Omar Pecos Portfolio",
  },
  data() {
    return {
      projectDisplayed: null,
      typeSearched: "ALL",
      TYPES,
      seeingImages: false,
      seeingFiles: false,
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  components: {
    VueSlickCarousel,
    TranslateButton,
    RepoLogo,
    HandCursorImg,
  },
  mounted() {
    // WIP - no native projects at this time so erasing from filtering (error with Slider)
    this.TYPES = this.TYPES.filter((type) => type !== "native");
  },
  methods: {
    styleTechName(type, node) {
      let color = setColorByType(type);
      let style = { color };

      switch (node) {
        case "type":
          style = {
            ...style,
            fontWeight: "bold",
          };
          break;
        case "badge":
          style = {
            padding: "2px 5px",
            backgroundColor: color,
            color: "white",
            fontWeight: "bold",
            borderRadius: "30px",
          };
          break;
      }

      return style;
    },
    openRepoinNewTab(url) {
      if (url) window.open(url, "_blank");
    },
    changeImageVisibility(value) {
      this.seeingImages = !value;
    },
    getProjectsByType(type) {
      let projects = null;
      if (type === "ALL") {
        projects = this.$page.projects.edges;
      } else {
        projects = this.$page.projects.edges.filter(
          (edge) => edge.node.type === type
        );
      }
      return projects;
    },
  },
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

.repo-card-div-dark {
  color: rgb(88, 96, 105);
  background-color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  align-items: center;
  justify-content: space-between;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.repo-description-clip:hover {
  overflow: visible;
  display: block;
}

.repo-description-detail {
  overflow: hidden;
  display: block;
}

.dark-card-mode {
  background-color: #171c28 !important;
  color: white;
}
.dark-card-mode p {
  color: white;
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

.software-skill-inline > img {
  margin: 0 auto;
}

.software-skill-inline > i:hover {
  color: #645beb;
}
.software-skill-inline > p {
  color: #868e96;
  font-size: 10px;
}
.software-skill-inline > i:hover ~ p {
  color: #645beb;
}

.slick-dots {
  position: unset;
}
.project-title {
  font-size: 40px;
  font-weight: 400;
  line-height: normal;
}

.image-div {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.fitImage {
  min-width: 150px;
  min-height: fit-content;
  max-height: 150px;
  overflow: hidden;
}

.fitImage:hover {
  max-height: fit-content;
  overflow: visible;
  position: relative;
  z-index: 99;
  left: -1vw;
}

.fitImage img {
  width: 100%;
  max-width: 250px;
}

.fitImage img:hover {
  border: 2px solid lightgrey;
  border-bottom: 5px solid lightgrey;
  transform: scale(1.3);
}

.types {
  margin: 10px auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.types > span {
  cursor: pointer;
  padding: 5px 10px;
}

.typeActive {
  text-decoration: overline;
}

@media (min-width: 768px) {
  .fitImage img:hover {
    transform: scale(2);
  }
}
</style>
