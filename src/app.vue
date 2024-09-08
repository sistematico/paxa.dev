<script setup lang="ts">
import Base from '@/layouts/base.vue'
import Icon from '@/components/icon.vue'
</script>
<template>
  <Base>
  <div class="p-5 rounded-3 semi">
    <div class="container-fluid">
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
        <a href="https://wa.me/5567998552020?text=Tenho%20interesse%20em%20um%20website" target="_blank">
          <Icon name="whatsapp" />
        </a>
        <a href="https://wa.me/5567998552020?text=Tenho%20interesse%20em%20um%20website" target="_blank">
          <Icon name="telegram" />
        </a>
      </p>
      <!-- <button class="btn btn-primary btn-lg" type="button">OK</button> -->
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
</style>