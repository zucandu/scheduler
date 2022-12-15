"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[738],{738:(s,r,t)=>{t.r(r),t.d(r,{default:()=>y});var o=t(821),a={class:"min-vh-100 d-flex flex-column align-items-center justify-content-center py-4"},e={class:"container"},n={class:"row justify-content-center"},d={class:"col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center"},i={class:"d-flex justify-content-center py-4"},c=(0,o._)("img",{class:"mx-5",src:"/storage/scheduler.svg",width:"60",alt:"Zucandu Scheduler"},null,-1),l={class:"card card-body shadow-sm w-100"},u=(0,o._)("div",{class:"card-title h5"},"Reset your password",-1),f={key:0,class:"text-danger"},p={class:"mb-3"},m=(0,o._)("label",{for:"password",class:"form-label"},"Password",-1),w={class:"mb-3"},h=(0,o._)("label",{for:"password-confirm",class:"form-label"},"Confirm Password",-1),g={key:0,class:"text-danger small"},_={class:"d-flex justify-content-between"},b=["disabled"];const v={data:function(){return{formdata:{password:void 0,password_confirmation:void 0,token:void 0},errorMsg:void 0}},created:function(){this.formdata.token=this.$route.params.token},methods:{resetPassword:function(){var s=this;this.$store.dispatch("resetPassword",this.formdata).then((function(){s.$router.push({path:"/login",query:{msg:"Your password has been reset. Please login and happy shopping!"}})})).catch((function(r){s.errorMsg=r.response.data.message}))}},computed:{passwordNotMatch:function(){return this.formdata.password&&this.formdata.password!==this.formdata.password_confirmation}}};const y=(0,t(744).Z)(v,[["render",function(s,r,t,v,y,k){var x=(0,o.up)("router-link");return(0,o.wg)(),(0,o.iD)("section",a,[(0,o._)("div",e,[(0,o._)("div",n,[(0,o._)("div",d,[(0,o._)("div",i,[(0,o.Wm)(x,{to:"/",class:"logo"},{default:(0,o.w5)((function(){return[c]})),_:1})]),(0,o._)("div",l,[u,s.errorMsg?((0,o.wg)(),(0,o.iD)("p",f,(0,o.zw)(s.errorMsg),1)):(0,o.kq)("",!0),(0,o._)("form",{onSubmit:r[2]||(r[2]=(0,o.iM)((function(s){return k.resetPassword()}),["prevent"]))},[(0,o._)("div",p,[m,(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":r[0]||(r[0]=function(r){return s.formdata.password=r}),type:"password",class:"form-control",id:"password",placeholder:"Password",required:""},null,512),[[o.nr,s.formdata.password]])]),(0,o._)("div",w,[h,(0,o.wy)((0,o._)("input",{"onUpdate:modelValue":r[1]||(r[1]=function(r){return s.formdata.password_confirmation=r}),type:"password",class:"form-control",id:"password-confirm",placeholder:"Password Confirmation",required:""},null,512),[[o.nr,s.formdata.password_confirmation]]),k.passwordNotMatch?((0,o.wg)(),(0,o.iD)("div",g,"Please make sure your password match")):(0,o.kq)("",!0)]),(0,o._)("div",_,[(0,o.Wm)(x,{class:"btn btn-link px-0",to:"/login"},{default:(0,o.w5)((function(){return[(0,o.Uk)("Back to login")]})),_:1}),(0,o._)("button",{class:"btn btn-primary",type:"submit",disabled:k.passwordNotMatch},"Reset",8,b)])],32)])])])])])}]])}}]);