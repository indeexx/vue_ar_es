<template>
  <div class="container">
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import INDEEX from "babylonjs";
import 'babylonjs-loaders';

@Component({})
export default class Index extends Vue {
  private msg: string = "Hello indeex.";
  private canvas!: any ;
  private engine!: INDEEX.Engine;
  private scene!: INDEEX.Scene;
  private camera!: any;
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
    this.camera = new INDEEX.ArcRotateCamera("arcCam",INDEEX.Tools.ToRadians(86),INDEEX.Tools.ToRadians(52),55.0,INDEEX.Vector3.Zero(),this.scene);
    this.camera.target = new INDEEX.Vector3(0, 0, 0);
    this.camera.attachControl(this.canvas,true);
    this.pointLight = new INDEEX.PointLight('ponitLigth1', INDEEX.Vector3.Zero(), this.scene);
    this.pointLight.position = new INDEEX.Vector3(20, 20, 20);
    this.pointLight.diffuse = new INDEEX.Color3(.1, .1, .1);//灯光固定颜色
    this.pointLight.specular = new INDEEX.Color3(.1, .1, .1);//漫反射
    this.pointLight.intensity = 1.0;//光照强度 默认1.0
    this.light = new INDEEX.HemisphericLight('light1', new INDEEX.Vector3(0,50,0), this.scene);

    let groundMaterial: INDEEX.StandardMaterial = new INDEEX.StandardMaterial("groundMaterial", this.scene);
    let texture = new INDEEX.Texture("assets/models/cj/environment_Building_zhucheng_002_01.jpg", this.scene);
    groundMaterial.diffuseTexture = texture;
    let ground: any = INDEEX.MeshBuilder.CreateGround('ground1', {height:39, width:26, subdivisions: 10}, this.scene);
    ground.material = groundMaterial;
    ground.receiveShadows = true;
    ground.position = new INDEEX.Vector3(-2, 24, -2);

    let ground1: any = INDEEX.MeshBuilder.CreateGround('ground1', {height:36, width:86, subdivisions: 10}, this.scene);
    ground1.material = groundMaterial;
    ground1.receiveShadows = true;
    ground1.position = new INDEEX.Vector3(-10, 19, 34);
    

    INDEEX.SceneLoader.ImportMesh('', 'assets/models/cj/', 'cj.babylon', this.scene, (newMeshes: any) => {
        for(let i = 0; i< newMeshes.length; i++){
          let mesh: any = newMeshes[i];
          let obj: any = mesh.position;
          let x: number = obj.x;
          let y : number = obj.y;
          let z : number = obj.z;
          mesh.position = new INDEEX.Vector3(x + 58, y, z + 65);
        }
    });

    INDEEX.SceneLoader.ImportMesh('', 'assets/models/babylon/test/girl01/', 'girl01.babylon', this.scene, (newMeshes: any) => {
        for(let i = 0; i< newMeshes.length; i++){
          let mesh: any = newMeshes[i];
          let obj: any = mesh.position;
          let x: number = obj.x;
          let y : number = obj.y;
          let z : number = obj.z;
          mesh.position = new INDEEX.Vector3(x , y + 20, z + 28);
          mesh.rotation = new INDEEX.Vector3(INDEEX.Tools.ToRadians(-90), INDEEX.Tools.ToRadians(0), INDEEX.Tools.ToRadians(190));
        }
    });

    // let loader: any = new INDEEX.AssetsManager(this.scene);
		// let edificioB4: any = loader.addMeshTask("A2", "", "assets/models/cj/max/obj/", "cj.obj");
		// INDEEX.OBJFileLoader.OPTIMIZE_WITH_UV = true;
    // loader.load();
    // loader.position = new INDEEX.Vector3(0, 0, 0);


    //skybox
    let skybox = INDEEX.MeshBuilder.CreateBox("skyBox", {size:10000.0}, this.scene);
    let skyboxMaterial = new INDEEX.StandardMaterial("skyBox", this.scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new INDEEX.CubeTexture("assets/models/skybox/skybox/", this.scene, ["skybox_px.jpg", "skybox_py.jpg", "skybox_pz.jpg", "skybox_nx.jpg", "skybox_ny.jpg", "skybox_nz.jpg"]);
    skyboxMaterial.reflectionTexture.coordinatesMode = INDEEX.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new INDEEX.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new INDEEX.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

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
  }
}
</style>
