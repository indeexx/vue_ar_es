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
    })
  }
  private init(): void {
    console.log("init...");
    let that = this;
    this.canvas = document.getElementById('renderCanvas');
    this.engine = new INDEEX.Engine(this.canvas);
    this.scene = new INDEEX.Scene(this.engine);
    this.engine.runRenderLoop(() => {
      that.scene.render();
    });
    this.camera = new INDEEX.FreeCamera('freeCamera1', new INDEEX.Vector3(10,20,30), this.scene);
    this.camera.setTarget(INDEEX.Vector3.Zero());
    this.camera.attachControl(this.canvas, false);
    this.pointLight = new INDEEX.PointLight('ponitLigth1', INDEEX.Vector3.Zero(), this.scene);
    this.pointLight.position = new INDEEX.Vector3(20, 20, 20);
    this.pointLight.diffuse = new INDEEX.Color3(0, 1, 0);//灯光固定颜色 绿色
    this.pointLight.specular = new INDEEX.Color3(1, 0, 0);//漫反射 红色
    this.pointLight.intensity = 1.0;//光照强度 默认1.0
    this.light = new INDEEX.HemisphericLight('light1', new INDEEX.Vector3(0,1,0), this.scene);
    let sphere = INDEEX.MeshBuilder.CreateSphere('sphere', {segments:16, diameter:2}, this.scene);
    sphere.position.y = 1;
    var ground = INDEEX.MeshBuilder.CreateGround('ground1', {height:6, width:6, subdivisions: 2}, this.scene);
    INDEEX.SceneLoader.Load( 'assets/models/babylon/test/girl01/', 'girl01.babylon', this.engine, (scene: any) => {
      //add orther scene
      console.log('load success');
      scene.executeWhenReady(function () {
        scene.activeCamera.attachControl(that.canvas);
        that.engine.runRenderLoop(function() {
          scene.render();
        });
      });
    }, (progress: any) => {
      //progress
      console.log('progress');
    }, (error: any) => {
      // error
      console.log('error');
    });
    // INDEEX.SceneLoader.ImportMeshAsync('', '../assets/models/', 'test2.babylon', this.scene);


    //skybox
    let skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:1000.0}, this.scene);
    let skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("assets/models/skybox/skybox/", this.scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  #renderCanvas {
    width: 100%;
    height: 100%;
    // background-color: #f1f1f1;
  }
}
</style>
