<script setup lang="ts">
import Base from '@/layouts/base.vue'
import Icon from '@/components/icon.vue'
</script>
<template>
  <Base>
    <div class="p-2 p-md-5 rounded-3 semi">
      <div class="container-fluid">
        <div class="float-end">
          <!-- <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Menu</button> -->
          <a href="https://blog.paxa.dev" class="btn btn-lg btn-warning unstyled">Blog</a>
        </div>
        <h1 class="display-5 fw-bold">Paxá</h1>
        <p class="col-md-12 fs-4">
          Olá! Meu nome é Lucas, sou especialista em <a href="javascript:void(0)" v-tooltip title="Superset JavaScript criado pela Microsoft.">TypeScript</a>, 
          uso frameworks como 
          <a href="javascript:void(0)" v-popover data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-title="Vue.js" data-bs-content="Visite o site do <a href='https://vuejs.org' target='_blank'>Vue.js</a> para saber mais." data-bs-html="true">Vue.js</a>, 
          <a href="javascript:void(0)" v-popover data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-title="Astro" data-bs-content="Visite o site do <a href='https://astro.build' target='_blank'>Astro</a> para saber mais." data-bs-html="true">Astro</a>, 
          <a href="javascript:void(0)" v-popover data-bs-toggle="popover" data-bs-placement="top" data-bs-trigger="hover focus" data-bs-title="React" data-bs-content="Visite o site do <a href='https://react.dev' target='_blank'>React</a> para saber mais." data-bs-html="true">React</a>, 
          React e runtimes como
          Bun e Node.js para criar aplicações web de visual refinado e alta performance.
          <br />
          <br />
          Sou usuário de Linux desde 1999 e tenho vasta experiência em administração
          de sistemas, garantindo soluções robustas, estáveis e seguras.
          <br />
          <br />
          Publiquei diversos artigos, tutoriais e <a href="https://blog.paxa.dev/snippets">snippets</a> no meu <a href="https://blog.paxa.dev">blog</a>, todos voltados para o desenvolvimento web.<br />
          Eles abordam desde conceitos básicos até técnicas mais avançadas, e podem ser uma boa fonte de aprendizado ou inspiração para quem está imerso nesse universo.
          <br /> 
          Sinta-se à vontade para explorar, acredito que encontrará algo útil para aprimorar suas habilidades.
          <br />
          <br />
          Vamos juntos construir soluções inovadoras e impactantes!
          <br />
          Entre em contato via <a href="mailto:sistematico@gmail.com">e-mail</a> ou <a href="https://t.me/sistematico" target="_blank">Telegram</a>.
          <br />
          <br />
          Paxá<br />
          Full-Stack Web Developer
          <br />
          <div class="social">
            <!-- <a href="https://wa.me/5567998552020?text=Tenho%20interesse%20em%20um%20website" class="unstyled" target="_blank">
              <Icon name="whatsapp" />
            </a> -->
            <a href="https://t.me/sistematico" class="unstyled" target="_blank">
              <Icon name="telegram" />
            </a>
            <a href="https://github.com/sistematico" class="unstyled" target="_blank">
              <Icon name="github" />
            </a>
            <a href="mailto:sistematico@gmail.com" class="unstyled">
              <Icon name="alt-email" />
            </a>
          </div>
        </p>
      </div>
    </div>
    <!-- <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>Try scrolling the rest of the page to see this option in action.</p>
      </div>
    </div> -->
  </Base>
</template>
<style>
.social a:nth-of-type(1):hover {
  /* color: #A7C080; */
  color: #24A1DE;
}

.social a:nth-of-type(2):hover {
  /* color: #a8a8a8; */
  color: #fafafa;
}

.social a:nth-of-type(3):hover {
  color: #7FBBB3;  
}

.social a:nth-of-type(4):hover {
  color: #DBBC7F;
}
</style>