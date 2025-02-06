<template v-if="store.values.length > 0">

  <div class="main">
    <div class="second">
      <div id="title">Настройте тариф</div>
      <div class="text-field">
        <span class="mainText" for="login">Телефон</span>
        <div class="text-field">
          <div class="text-field-icon">
            <input class="text-field-input" v-if="!telError" type="search" name="search" id="search"
              placeholder="+7 (___) ___-__-__" v-model="store.selected.tel">
            <input class="text-field-error" v-if="telError" type="search" name="search" id="search"
              placeholder="+7 (___) ___-__-__" v-model="store.selected.tel">
            <span class="text-field-secondIcon" v-if="telError">
              <img src="../public/Vector .png" width="20">
            </span>
          </div>
        </div>
        <span v-if="!telError" class="secondText">Обязательное поле</span>
        <span v-if="telError" class="secondTextError">Обязательное поле</span>

        <div class="sliders">
          <span class="mainText">Минуты</span>
          <div class="slider">
            <input class="range-style" id="slider1" type="range" value="0" min="0" max="3" step="1"
              v-model="store.selected.minutes" @mousedown="slider1 = true" @mouseup="slider1 = false">
            <div class="onboard" v-if="!slider1" :style="{ width: store.selected.minutes * 250 + 'px' }"></div>
            <div class="onboard-hold" v-if="slider1" :style="{ width: store.selected.minutes * 250 + 'px' }"></div>
            <div class="values"><a v-for="a in store.values.minutes">{{ a }}</a></div>
          </div>

          <span class="mainText">СМС</span>
          <div class="slider">
            <input class="range-style" id="slider2" type="range" value="0" min="0" max="3" step="1"
              v-model="store.selected.sms" @mousedown="slider2 = true" @mouseup="slider2 = false">
            <div class="onboard" v-if="!slider2" :style="{ width: store.selected.sms * 250 + 'px' }"></div>
            <div class="onboard-hold" v-if="slider2" :style="{ width: store.selected.sms * 250 + 'px' }"></div>
            <div class="values"><a v-for="a in store.values.sms">{{ a }}</a></div>
          </div>

          <span class="mainText">Интернет</span>
          <div class="slider">
            <input class="range-style" id="slider3" type="range" value="0" min="0" max="3" step="1"
              v-model="store.selected.internet" @mousedown="slider3 = true" @mouseup="slider3 = false">
            <div class="onboard" v-if="!slider3" :style="{ width: store.selected.internet * 250 + 'px' }"></div>
            <div class="onboard-hold" v-if="slider3" :style="{ width: store.selected.internet * 250 + 'px' }"></div>
            <div class="values"><a v-for="a in store.values.internet">{{ a }}</a></div>
          </div>
        </div>
      </div>

      <span class="mainText">Wi-Fi Роутер</span>

      <div class="checkbox">
        <div class="checkbox-wrapper-4">
          <input class="inp-cbx" id="morning" type="checkbox" v-model="store.selected.rent" />
          <label class="cbx" for="morning"><span>
              <svg width="12px" height="10px">
                <use xlink:href="#check-4"></use>
              </svg></span></label>
        </div>
        <div class="wifi">Аренда <b>99</b> ₽/мес.</div>
        <button class="butt" @click=" validatePhoneNumber()"><b>{{ store.getSum }} ₽</b> в месяц</button>
      </div>
    </div>
  </div>

  <svg>
    <symbol id="check-4" viewbox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </symbol>
  </svg>

</template>





<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useStore } from '../src/store/store';

const store = useStore();
const telError = ref<boolean>(false);
function validatePhoneNumber() {
  const regex = /^(?:\+)?\d(?:[ (]+)?\d{3}(?:[ )]+)?\d{3}(?:[- ]+)?\d{2}(?:[- ]+)?\d{2}$/gm
  if (regex.test(String(store.selected.tel)) === false) {
    telError.value = true
    setTimeout(() => {
      telError.value = false
    }, 3000);
  }
  else { store.showResult() }
}

const slider1 = ref(false)
const slider2 = ref(false)
const slider3 = ref(false)

onMounted(() => {
  store.getData();
  slider1.value = true
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

.main {
  width: 900px;
  height: 1100px;
  background-color: #eff2f4;
  font-family: 'Inter', sans-serif;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.second {
  width: 800px;
  height: 1425px;
  padding-left: 70px;
  padding-top: 40px;
}

#title {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 50px;
}

.mainText {
  display: block;
  font-weight: 500;
  font-size: 18px;
}

.text-field-input {
  margin-top: 20px;
  display: block;
  width: 270px;
  height: 40px;
  padding: 18px;
  font-family: inherit;
  font-size: 16px;
  font-weight: 300;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #bdbdbd;
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

}

.text-field-error {
  margin-top: 20px;
  display: block;
  width: 270px;
  height: 40px;
  padding: 18px;
  font-size: 16px;
  font-family: inherit;
  font-weight: 300;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #EB5757;
  border-radius: 6px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.text-field-error:focus {
  border-color: #EB5757;
  outline: 0;

}

.text-field-error[type="search"]::-webkit-search-decoration,
.text-field-error[type="search"]::-webkit-search-cancel-button,
.text-field-error[type="search"]::-webkit-search-results-button,
.text-field-error[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.text-field-input[type="search"]::-webkit-search-decoration,
.text-field-input[type="search"]::-webkit-search-cancel-button,
.text-field-input[type="search"]::-webkit-search-results-button,
.text-field-input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.text-field-input:focus {
  color: #212529;
  background-color: #fff;
  border-color: #7A5CFA;
  outline: 0;
}

.text-field-icon {
  position: relative;
}

.text-field-icon .text-field-input {
  padding-right: 2.5rem;
}

.text-field-secondIcon {
  position: absolute;
  display: flex;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 235px;
  width: 1rem;
  cursor: pointer;
  color: #bdbdbd;
  transition: color 0.15s ease-in-out;
}

.text-field-secondIcon:hover {
  color: #212529;
}

.text-field-secondIcon-2 {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  right: 0;
  width: 2.5rem;
  border: 1px solid #bdbdbd;
  background-color: #f5f5f5;
  cursor: pointer;
  color: #212529;
  transition: background-color 0.15s ease-in-out;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

.text-field-secondIcon-2:hover {
  background-color: #e0e0e0;
}

.secondText {
  font-weight: 200;
  font-size: 8px;
  color: #86969C;
}

.secondTextError {
  font-weight: 200;
  font-size: 8px;
  color: #EB5757;
}

.sliders {
  margin-top: 40px;
}

.slider {
  margin-top: 40px;
  margin-bottom: 40px;
}

.range-style {
  -webkit-appearance: none;
  width: 750px;
  height: 6px;
  background: #bbc5ce;
  outline: none;
  position: relative;
  border-radius: 999px;
  transition: all 0.7s;
}

.range-style::-webkit-slider-thumb {
  -webkit-appearance: none;
  border: 2px solid #EEF2F4;
  /* background: #7A5CFA; */
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.7s;
  width: 40px;
  height: 40px;
  border: 1;
  z-index: 9999;
  position: relative;
  cursor: pointer;
  background: url(../public/arrows.png);
  background-color: #7A5CFA;
  background-size: 18px;
  background-position: center;
  background-repeat: no-repeat;
}

.onboard {
  background-color: #000000;
  height: 6px;
  position: absolute;
  margin-top: -10px;
  margin-left: 2px;
  border-radius: 999px;
}

.onboard-hold {
  background-color: #7A5CFA;
  height: 6px;
  position: absolute;
  margin-top: -10px;
  margin-left: 2px;
  border-radius: 999px;
}

.values {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 750px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
}

.checkbox {
  margin-top: 30px;
}

.checkbox-wrapper-4 * {
  box-sizing: border-box;
}

.checkbox-wrapper-4 .cbx span {
  float: left;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);

}

.checkbox-wrapper-4 .cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  transform: scale(1);
  border: 1px solid #cccfdb;
  transition: all 0.2s ease;
  box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);
}

.checkbox-wrapper-4 .cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}

.checkbox-wrapper-4 .cbx:hover span:first-child {
  border-color: #7A5CFA;

}

.checkbox-wrapper-4 .inp-cbx {
  position: absolute;
  visibility: hidden;
}

.checkbox-wrapper-4 .inp-cbx:checked+.cbx span:first-child {
  border-color: #7A5CFA;
  background: #7A5CFA;
  animation: wave-4 0.4s ease;
}

.checkbox-wrapper-4 .inp-cbx:checked+.cbx span:first-child svg {
  stroke-dashoffset: 0;
}

.wifi {
  margin-bottom: 1rem;
  padding-left: 30px;
}

.butt {
  background-color: black;
  border: none;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: white;
  transition: 0.3s;
  margin-top: 33px;
  width: 140px;
  height: 50px;
  font-size: 16px;
  font-weight: 100;
  cursor: pointer;
}

.butt:hover {
  background-color: #7A5CFA;
}
</style>