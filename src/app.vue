<script setup lang="ts">
import Base from '@/layouts/base.vue'
import Icon from '@/components/icon.vue'
</script>
<template>
  <Base>
    <div class="p-5 rounded-3 semi">
      <div class="container-fluid">
        <div class="float-end">
          <!-- <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            Menu
          </button> -->
          <a href="https://blog.paxa.dev" class="btn btn-primary unstyled">
            Blog
          </a>
        </div>
        <h1 class="display-5 fw-bold">Paxá</h1>
        <p class="col-md-12 fs-4">
          Olá! Meu nome é Lucas, sou especialista em TypeScript, uso frameworks como Vue.js, Astro, React e runtimes como
          Bun e Node.js para criar aplicações web de visual refinado e alta performance.
          <br />
          <br />
          Sou usuário de Linux desde 1999 e tenho vasta experiência em administração
          de sistemas, garantindo soluções robustas, estáveis e seguras.
          <br />
          <br />
          Vamos juntos construir soluções inovadoras e impactantes!
          <br />
          <a href="mailto:sistematico@gmail.com">Entre em contato</a>
          <br />
          <br />
          Paxá<br />
          Full-Stack Web Developer
          <br />
          <a href="https://wa.me/5567998552020?text=Tenho%20interesse%20em%20um%20website" class="unstyled" target="_blank">
            <Icon name="whatsapp" />
          </a>
          <a href="https://t.me/sistematico" class="unstyled" target="_blank">
            <Icon name="telegram" />
          </a>
          <a href="mailto:sistematico@gmail.com" class="unstyled">
            <Icon name="alt-email" />
          </a>
        </p>
        <!-- <button class="btn btn-primary btn-lg" type="button">OK</button> -->
      </div>
    </div>
    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <p>Try scrolling the rest of the page to see this option in action.</p>
      </div>
    </div>
  </Base>
</template>
<style>
a:nth-of-type(2):hover {
  color: #A7C080;
}

a:nth-of-type(3):hover {
  color: #7FBBB3;
}

a:nth-of-type(4):hover {
  color: #DBBC7F;
}
</style>