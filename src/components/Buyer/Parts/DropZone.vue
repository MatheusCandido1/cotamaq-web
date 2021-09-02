<template>
    <div>
        <div class="w-full dropzone flex justify-center items-center mb-4  mt-1">
            <input
                type="file"
                ref="inputFile"
                class="iputfile"
                multiple accept="image/*"
                @change="handlePreview">

                <div v-if="files.length > 0">
                    <div>
                        <div class="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>                     
                        <h1>Arraste e solte os arquivos aqui ou click</h1>
                      </div>

                    </div>
                    <div  class=" flex  flex-wrap justify-between" >
                        <div class="m-2  " v-for="(image,index) in files" :key="image.ids">
                            <dir class="">
                                <button @click="deleteImage(index)"   class="relative delete   mr-1 px-1 py-1 bg-red-500 text-sm font-medium   text-white rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <img class="preview"  :src="image.preview" >
                            </dir>                       
                        </div>                                    
                    </div>

                    

                </div>
             

                <div v-else >
                    <div class="flex justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>                       
                    </div>
                     <h1>Arraste e solte os arquivos aqui ou click</h1>
                </div>

                         
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                files: [],
                formData: new FormData()
                
            }
        },
        methods: {
            deleteImage(index){
                this.files.splice(index,1)
               
            },                
            handlePreview(event) {
                let files = event.target.files;
                for (var i = 0; i < files.length; i++) {
                    if(files[i].type.match('image')){
                        this.files.push({data:files[i], preview:URL.createObjectURL(files[i])})       
                    }                                                       
                }
                this.files = Array.from(this.files);                

               this.$store.commit('setFiles', this.files)

            },
            

            
        },
        
    }
</script>

<style lang="scss" scoped>
.iputfile {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
  margin-top: -10px;
  margin-left: -10px;
  z-index: 10;
}
.dropzone {
  min-height: 200px;
  padding: 10px;
  position: relative;
  cursor: pointer;
  border: 1px dashed #2bcb6f;

}
.z-100{
    z-index: 9999999;
}
.preview {
  width: 120px;
  height: 120px;
  border-radius: 10px;
}
.delete{
    z-index: 11;
    top: 22px;
    right: 10px;
}

@media(max-width: 768px){
    .preview{
        width: 80px;
        height: 90px;
    }
}
@media(max-width: 425px){
    .preview{
        width: 80px;
        height: 90px;
    }

}
</style>