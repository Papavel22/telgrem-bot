<template>
  <div class="drag-and-drop">
    <VueFileAgent
      ref="vueFileAgent"
      :theme="'default'"
      :multiple="false"
      :deletable="true"
      :meta="false"
      :accept="'image/*'"
      :maxSize="'10MB'"
      :maxFiles="1"
      :helpText="'Choose images'"
      :errorText="{
      type: 'Invalid file type. Only images or zip Allowed',
      size: 'Files should not exceed 10MB in size',
    }"
      @select="filesSelected($event)"
      @beforedelete="onBeforeDelete($event)"
      @delete="fileDeleted($event)"
      v-model="fileRecords"
    ></VueFileAgent>
  </div>
</template>

<script>
import Vue from 'vue'
import VueFileAgent from 'vue-file-agent'

Vue.use(VueFileAgent)
export default {
  props: {
    image: String
  },
  data: function () {
    return {
      fileRecords: [],
      uploadHeaders: { 'X-Test-Header': 'vue-file-agent' },
      fileRecordsForUpload: []
    }
  },
  methods: {
    deleteUploadedFile (fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord)
    },
    filesSelected (fileRecordsNewlySelected) {
      let validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error)
      this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords)
      this.$emit('chooseImage', this.fileRecords[0].urlResized)
    },
    onBeforeDelete (fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        this.$refs.vueFileAgent.deleteFileRecord(fileRecord)
      }
    },
    fileDeleted (fileRecord) {
      this.fileRecords = []
      this.$emit('deleteImage')
    }
  }
}
</script>

<style>
  @import '../../node_modules/vue-file-agent/dist/vue-file-agent.css';
  .grid-block-wrapper .grid-block {
    width: 100%;
  }
</style>
