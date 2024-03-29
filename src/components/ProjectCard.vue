<template>
  <div v-if="project">
    <div
      :key="project.id"
      :class="$store.state.darkMode ? 'repo-card-div-dark' : 'repo-card-div'"
    >
      <div class="repo-name-div" @click="openRepoinNewTab(project.url)">
        <RepoLogo />
        <p class="repo-name" :style="styleTechName(project.type, 'name')">
          {{ project.name }}
        </p>
        <HandCursorImg
          v-if="project.url"
          :rotation="-90"
          :styles="'margin-bottom:-7px;margin-left:10px;'"
        />
      </div>
      <p class="repo-description">
        {{ project.description }}
      </p>
      <TranslateButton
        v-if="$i18n.locale !== 'es'"
        :text="project.description"
      />
      <div
        v-if="project.images.length > 0"
        style="text-align:center;padding: 10px 0"
      >
        <span @click="changeImageVisibility(seeingImages)"
          >{{ $t("Project_card.see_images") }}
        </span>
      </div>
      <div class="image-div" v-if="seeingImages">
        <span
          v-for="image of project.images"
          v-bind:key="image"
          class="fitImage"
        >
          <g-image :src="image"></g-image>
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
                  v-for="tech in project.techs"
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
          <span>{{ project.type.toUpperCase() }}</span>
          <span v-if="project.repo_url">
            <a :href="project.repo_url" target="_blank">
              <g-image src="~/assets/images/github.png" width="50"></g-image>
            </a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setColorByType } from "../utils";
import TranslateButton from "./TranslateButton.vue";
import HandCursorImg from "./HandCursorImg.vue";
import RepoLogo from "./RepoLogo.vue";

export default {
  components: {
    TranslateButton,
    HandCursorImg,
    RepoLogo,
  },
  props: ["project"],
  data() {
    return {
      seeingImages: false,
    };
  },
  methods: {
    styleTechName(type, node) {
      let color = setColorByType(type);
      return node === "name"
        ? { color }
        : {
            padding: "2px 5px",
            backgroundColor: color,
            color: "white",
            fontWeight: "bold",
            borderRadius: "30px",
          };
    },
    openRepoinNewTab(url) {
      if (url) window.open(url, "_blank");
    },
    changeImageVisibility(value) {
      this.seeingImages = !value;
    },
  },
};
</script>

<style>
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

.repo-card-div {
  color: rgb(88, 96, 105);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 10px 30px -15px;
  padding: 2rem;
  cursor: pointer;
}
.repo-card-div-dark {
  color: rgb(88, 96, 105);
  background-color: inherit;
  box-shadow: rgba(255, 255, 255, 0.4) 0px 10px 30px -15px;
  padding: 2rem;
  cursor: pointer;
}
.repo-card-div:hover {
  box-shadow: rgba(0, 0, 0, 0.4) 0px 20px 30px -10px;
}
.repo-card-div-dark:hover {
  box-shadow: rgba(255, 255, 255, 0.4) 0px 20px 30px -10px;
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
  margin-bottom: -5px;
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
}

.repo-star-svg {
  margin-right: 0.3rem;
}

.repo-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-description:hover {
  display: block;
  overflow: visible;
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
.software-skill-inline > i:hover ~ p {
  color: #645beb;
}

@media (min-width: 768px) {
  /*
   Si queremos en dos columnas repo-stats en pantallas grandes. si hay muchas techs se descuadran :'(
    .repo-stats{
        flex-direction: row;
    }*/

  .fitImage img:hover {
    transform: scale(2);
  }
}
</style>
