<template>
  <div class="container">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import INDEEX from "babylonjs";

@Component({})
export default class Index extends Vue {
  private msg: string = "Hello indeex.";
  private canvas!: any ;
  private engine!: INDEEX.Engine;
  private scene!: INDEEX.Scene;
  private camera!: INDEEX.FreeCamera;
  private pointLight!: INDEEX.PointLight;
  private light!: INDEEX.HemisphericLight;

  mounted() {
    this.init();
    window.addEventListener('resize', () => {
      this.engine.resize();
    });
  }
  private init(): void {
    console.log("init...");
    let that = this;
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new INDEEX.Engine(this.canvas);
    this.scene = new INDEEX.Scene(this.engine);
    this.scene.clearColor = new BABYLON.Color4(0, 0, 0.1, 0.1);
    this.engine.runRenderLoop(() => {
      that.scene.render();
    });
    this.camera = new INDEEX.FreeCamera('freeCamera1', new INDEEX.Vector3(4, 4, -4), this.scene);
    this.camera.setTarget(INDEEX.Vector3.Zero());
    this.camera.attachControl(this.canvas, false);
    this.camera.position.x = 3;
    this.camera.position.y = 5;
    this.camera.position.z = -3;
    this.pointLight = new INDEEX.PointLight('ponitLigth1', INDEEX.Vector3.Zero(), this.scene);
    this.pointLight.position = new INDEEX.Vector3(10, 2, 6);
    this.pointLight.diffuse = new INDEEX.Color3(1, 1, 1);//灯光固定颜色 绿色
    this.pointLight.specular = new INDEEX.Color3(1, 1, 1);//漫反射 红色
    this.pointLight.intensity = 1.0;//光照强度 默认1.0
    this.light = new INDEEX.HemisphericLight('light1', new INDEEX.Vector3(2,1,2), this.scene);
    // let sphere = INDEEX.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, this.scene);
    // sphere.position.y = 1;
    var ground = INDEEX.MeshBuilder.CreateGround('ground1', {height:5, width:5, subdivisions: 1}, this.scene);
    ground.position = new BABYLON.Vector3(0, -1, 0);

    // INDEEX.SceneLoader.Load( 'assets/models/babylon/test/girl01/', 'girl01.babylon', this.engine, (scene: any) => {
    //   //add orther scene
    //   console.log('load success');
    //   scene.executeWhenReady(function () {
    //     scene.activeCamera.attachControl(that.canvas);
    //     that.engine.runRenderLoop(function() {
    //       scene.render();
    //     });
    //   });
    // }, (progress: any) => {
    //   //progress
    //   console.log('progress');
    // }, (error: any) => {
    //   // error
    //   console.log('error');
    // });
    let girl:any = INDEEX.SceneLoader.ImportMeshAsync('', 'assets/models/babylon/test/girl01/', 'girl01.babylon', this.scene, (progress: any) => {
      let total: number = progress.total;
      let loaded: number = progress.loaded;
      if(total == loaded){
        console.log('load sucess.')
      }
    });

    //skybox
    // let skybox = INDEEX.MeshBuilder.CreateBox("skyBox", {size:1000.0}, this.scene);
    // let skyboxMaterial = new INDEEX.StandardMaterial("skyBox", this.scene);
    // skyboxMaterial.backFaceCulling = false;
    // skyboxMaterial.reflectionTexture = new INDEEX.CubeTexture("assets/models/skybox/skybox/", this.scene);
    // skyboxMaterial.reflectionTexture.coordinatesMode = INDEEX.Texture.SKYBOX_MODE;
    // skyboxMaterial.diffuseColor = new INDEEX.Color3(0, 0, 0);
    // skyboxMaterial.specularColor = new INDEEX.Color3(0, 0, 0);
    // skybox.material = skyboxMaterial;
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #renderCanvas {
    width: 100%;
    height: 100%;
    // background-color: #f1f1f1;
  }
}
</style>
