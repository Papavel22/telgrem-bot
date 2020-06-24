<template>
  <div class="overlay">
    <div class="modal">
      <form action="submit" @submit.prevent="handelSubmit" class="form">
        <div class="container">
          <div class="row">
            <div class="col-xs-8 col-md-6">
              <div v-if="this.localBotData.image !== '' && !this.changeImage" class="img-wrapper">
                <img v-bind:src="localBotData.image"
                     alt="bot image">
                <button
                  type="button"
                  @click="onChangeImage"
                  class="btn edit-image-btn">
                  Change image
                </button>
              </div>
              <div v-else>
                <FileAgent
                  class="vue-file-agent"
                  v-on:chooseImage="onChooseImage"
                  v-on:deleteImage ="onDeleteImage"/>
                <button
                  type="button"
                  :disabled="!newImage === null"
                  @click="onUploadImage"
                  class="btn edit-image-btn">
                  Upload
                </button>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-fields">
                <label for="title">
                  <input id="title" v-model="localBotData.title" placeholder="Enter bot's name"/>
                </label>
                <label for="description">
                  <input id="description" v-model="localBotData.description" placeholder="Enter bot's description"/>
                </label>
                <date-picker class="date-picker" v-model="localBotData.date" valueType="format"></date-picker>
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-controls">
                <button class="btn form-button" type="submit" >save</button>
                <button class="btn form-button" type="button" @click="onChanel" >cancel</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import FileAgent from './FileAgent'

export default {
  name: 'BotModal',
  components: { DatePicker, FileAgent },
  props: {
    editMode: Boolean,
    bot: Object
  },
  data () {
    return {
      localBotData: {
        title: '',
        description: '',
        imageURL: '',
        image: '',
        date: ''
      },
      changeImage: false,
      newImage: null
    }
  },
  methods: {
    ...mapActions({
      createBot: 'createBot',
      fetchBot: 'fetchBot',
      editBot: 'editBot'
    }),
    handelSubmit () {
      this.editMode ? this.onEditBot() : this.onSaveBot()
    },
    onChangeImage () {
      this.changeImage = true
    },
    onUploadImage () {
      this.localBotData.image = this.newImage
      this.changeImage = false
    },
    onChooseImage (img) {
      this.newImage = img
    },
    onDeleteImage () {
      this.newImage = null
    },
    onChanel () {
      this.closeModal()
    },
    async onSaveBot () {
      try {
        await this.createBot(this.localBotData)
        this.closeModal()
      } catch (e) {
        console.log(e)
      }
    },
    closeModal () {
      this.$emit('closeModal')
      this.clearFields()
    },
    clearFields () {
      for (let a in this.localBotData) {
        a = ''
      }
      this.image = ''
    },
    onEditBot () {
      this.editBot({...this.localBotData})
      this.closeModal()
    }
  },
  created () {
    this.localBotData = this.editMode ? {...this.bot} : this.localBotData
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/main.scss';
  .overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: auto;
  }
  .modal {
    padding: 15px 0;
    background-color: $white;
    @include breakpoint(xs) {
      min-height: 100%;
    }
  }
  .img-wrapper {
    display: flex;
    flex-direction: column;
    img {
      border-radius: 50%;
      width: 250px;
      height: 250px;
      margin: 0 auto 15px;
    }
  }
  .form {
    &-layout {
      display: flex;
      flex-wrap: wrap;
    }
    &-fields{
      display: flex;
      flex-direction: column;
      height: 100%;
      align-items: center;
      @include breakpoint(md) {
        padding-top: 20px;
      }
      label {
        margin-bottom: 20px;
        width: 100%;
      }
    }
    &-controls {
      padding-top: 20px;
      display: flex;
      justify-content: space-around;
      button{
        width: 100%;
        max-width: 100px;
      }
    }
    .date-picker {
      width: 100%;
    }
    input {
      display: inline-block;
      box-sizing: border-box;
      height: 34px;
      padding: 6px 30px 6px 10px;
      font-size: 14px;
      line-height: 1.4;
      color: #555;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
      width: 100%;
    }
    .edit-image-btn {
      width: 100%;
      &:disabled {
        opacity: .7;
        cursor: not-allowed;
        &:hover {
          color: #555;
          background-color: #fff;
          border: 1px solid #ccc;
        }
      }
    }
    .vue-file-agent {
      margin-bottom: 15px;
    }
  }
</style>
