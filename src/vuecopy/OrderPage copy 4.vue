<template>

  <div class="orderMenucontainer">
    <!-- 聯絡人區 -->
    <!-- <q-btn v-if="!show" color="blue" size="md" @click="show = !show" style="width:100%">{{ show ? '收起客戶資料' : '開啟客戶資料' }}</q-btn> -->
    <q-dialog  v-model="showPersonDialog" maximized>
  <div class="row person"  >

      <q-form
      @submit="onSubmit" @reset="onReset"
        class="person-form q-gutter-md row items-start justify-center"
        >
        <table  border="1" cellpadding="5" style="width: 100%;table-layout:fixed;word-break:break-all;background:#f2f2f2">
          <tr >
            <td  >
              <q-input
                outlined
                label="訂購日期"
                :input-style="{ fontSize: '18px' }"
                v-model="personForm.checkDate"
                mask="date"
                readonly
              >
                <template v-slot:append>
                  <q-icon name="calendar_today" class="cursor-pointer" style="width: 10px;">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="checkDate" today-btn>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="確定" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

            </td>

            <td >
              <q-select
              outlined
              v-model="personForm.pick"
              label="取貨方式"
              :options="picks"
              :rules="[val => !!val || '請選擇取貨方式']"
              style="padding: 0;font-size: 20px;"
              />
            </td>
            <td >
              <q-btn icon="event"  color="primary" style="width:150px;height:50px">
      <q-popup-proxy @before-show="updateProxy" cover transition-show="scale" transition-hide="scale"
      style="width:800px">
        <q-date v-model="personForm.getDate" style="width:800px">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="取消" color="red" v-close-popup />
            <q-btn label="確認" color="primary" @click="save" v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
    <q-badge color="teal row justify-center "
    style="width:150px;height:40px;font-size:18px">
        <p >送達日</p><br>
        <p >{{ personForm.getDate }}</p>
      </q-badge>

            </td>
            <td width="100">
              <q-input v-model="personForm.week"
              outlined
              label="星期"
              :input-style="{ fontSize: '20px' }"
              readonly/>
            </td>
            <td >
              <!-- <q-select
      v-model="personForm.time"
      outlined
      :options="timeOptions"
      label="送達時間"
      style="font-size: 15px;"
      :input-style="{ fontSize: '17px' }"
    /> -->
              <q-input
      v-model="personForm.time"
      outlined
      label="送達時間範圍"
      style="font-size: 15px;"
      :input-style="{ fontSize: '17px' }"
    />
            </td>
            <td>

<q-input
outlined
v-model="personForm.compilation"
type="number"
label="統編"
style="padding: 0;"
:input-style="{ fontSize: '20px' }"
:rules="[val => personForm.noCompilation === 'no' || val.length === 8 || '需為8位數']"
:readonly="isCompilationReadonly"
/>
<div class="row justify-center">
<q-radio
        size="md"
        val="no"
        v-model="personForm.noCompilation"
        label="不需要"

      />
<q-radio
        size="md"
        val="yes"
        v-model="personForm.noCompilation"
        label="需要"

      />
</div>
</td>
            <td colspan="2">
              <q-input
              outlined
               v-model="personForm.company"
               type="text"
               label="訂購公司"
               :input-style="{ fontSize: '20px' }"
               style="padding: 0;"/>
            </td>

          </tr>
          <tr>
            <td>
              <q-select
              outlined
              v-model="personForm.tel"
               type="number"
               label="訂購人手機"
               use-input
               :input-style="{ fontSize: '17px' }"
               hide-selected
                fill-input
                input-debounce="0"
                :options="telOptions"
                :option-value="option => option.tel"
                :option-label="option => option.name + ' ' + option.tel"
                @filter="filterTel"
                @input="selectTel(persoForm.tel)"
                :loading="loading"
               >
                <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey" >
                查無此號碼
              </q-item-section>
            </q-item>
          </template>
        </q-select>

            </td>
            <td>
              <q-input

              outlined
              v-model="personForm.name"
              label="訂購人"
              :input-style="{ fontSize: '20px' }"/>
              <div class="row" style="font-size: 20px; display: flex; justify-content: space-around;">

<q-radio
v-model="personForm.gender"
val="17"
label="Mr" />
<q-radio

v-model="personForm.gender"
val="18"
label="Ms" />
</div>
            </td>

            <td rowspan="2">
                 <q-input
                 style="width: 80px;"
              outlined
               v-model="personForm.prefix"
               type="number"
               label="區碼"
               :input-style="{ fontSize: '20px' }"/>
               <q-select outlined v-model="personForm.hometel" type="text" label="訂購人市話" use-input
  :input-style="{ fontSize: '17px' }" hide-selected fill-input input-debounce="0" :options="hometelOptions"
  @filter="filterHometel" @input="selectHometel" :loading="loading">
  <template v-slot:no-option>
    <q-item>
      <q-item-section class="text-grey">
        查無此號碼
      </q-item-section>
    </q-item>
  </template>
</q-select>

              <q-input
              outlined
               v-model="personForm.hometel2"
               type="number"
               label="分機"
               :input-style="{ fontSize: '20px' }"/>

            </td>
            <td rowspan="2" colspan="5">
              <div class="row">
                <div class="row"
                style="display: flex;
                align-items: center;">
          <div style="flex: 1;">
          <h5 style="margin: auto;">地址</h5>
          </div>
    <div class="row">

              <q-select
                style="padding: 2px;
                width: 120px;font-size: 20px;"
                type="text"
                outlined
                v-model="personForm.address"
                label="縣市"
              :options="addressoptions"
              />
              <q-select

                style="padding: 2px;width: 120px;font-size: 20px"
                outlined
                v-model="personForm.address2"
                label="區"
                :options="address2Options"
              />
              <q-select
              outlined
               v-model="personForm.road"
               type="text"
               label="路名"
               style="padding: 2px;width: 290px;font-size: 20px"
                :options="roadOptions"
                use-input
                @filter="filterRoadOptions"
                @input="selectRoadOptions"
                :loading="loading"
               />

              <q-input
              style="padding: 2px;width: 200px;"
              id="road2"
              outlined
               v-model="personForm.road2"
               type="text"
               label="門牌號碼"
               clearable
               :input-style="{ fontSize: '20px' }"
                />
          <h5 class="row justify-center" style="font-size: 1.2rem; margin: 0 5px;align-items: center;padding: 0;">輔助按鍵</h5>
              <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('巷')"
              class="q-mt-md"
               label="巷"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('弄')"
              class="q-mt-md"
               label="弄"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('衖')"
              class="q-mt-md"
               label="衖"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('號')"
              class="q-mt-md"
               label="號"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('棟')"
              class="q-mt-md"
               label="棟"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('樓')"
              class="q-mt-md"
               label="樓"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('大樓')"
              class="q-mt-md"
               label="大樓"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('房')"
              class="q-mt-md"
               label="房"/>
               <q-btn
              style="padding: 2px;width: 70px;font-size: 20px;border:#000000 1px solid;height: 15px;"
              color="primary"
              @click="run2('室')"
              class="q-mt-md"
               label="室"/>

              </div>
            </div>
          </div>
    </td>
          </tr>
          <tr>
            <td >
              <q-input
              outlined
              v-model="personForm.recipient"
              type="text"
              label="收件人"
              :input-style="{ fontSize: '20px' }"/>
              <q-checkbox
        size="md"
        v-model="personForm.sameOrderCustomer"
        val="xs"
        label="同訂購人"
        />

            </td>
            <td>
              <q-input
              outlined
               v-model="personForm.recipientTel"
               type="tel"
               label="收件人電話"
               :input-style="{ fontSize: '20px' }" />

            </td>

          </tr>
          <tr>

            <td colspan="2" >

              <q-input

              outlined
               v-model="personForm.getCompany"
               type="text"
               label="送達公司"
               :input-style="{ fontSize: '20px' }" />
               <q-checkbox
        size="md"
        v-model="personForm.sameOrderCompany"
        val="xs"
        label="同訂購公司"
        />
            </td>

            <td colspan="6" >
              <q-input
                  outlined
                  style="width:100%;margin-left: 20px;"
                  v-model="personForm.remark"
                  type="text"
                  label="客戶備註"
                  :input-style="{ fontSize: '20px' }"
                  @input="showDialog2"
                  />

            </td>
          </tr>
          <tr>
            <td colspan="8">
              <div class="row">

                <div class="row justify-start  col-6">
                  <q-select
                  style="width:100%;margin-left: 20px;"
              filled
              v-model="personForm.event"
              multiple
              :options="eventOptions"
              use-chips
              stack-label
              label="訂單分類"
              use-input
              />

                </div>
                <!-- 客戶備註 -->
                <q-dialog v-model="dialogVisible2" persistent>
      <q-card>
        <q-card-section>
          <q-input v-model="searchTerm2" placeholder="搜尋..." dense class="q-mb-md" />
          <q-item v-for="option2 in filteredOption2s" :key="option2" clickable @click="selectOption2(option2)">
            <q-item-section>
              <q-item-label>{{ option2 }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-pagination v-if="totalPage2s > 1" v-model="currentPage2" :min="1" :max="totalPage2s" :input="true" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="取消" color="primary" @click="closeDialog2" />
        </q-card-actions>
      </q-card>
    </q-dialog>
                <div class="row justify-end  col-3">

                  <q-select
                  outlined
                  v-model="personForm.locationId"
                  label="店家選擇"
                  :options="locationIds"
                  lazy-rules
                  style="padding: 0;width: 49%;font-size: 20px;"
              />
              <q-input
              outlined
              v-model="personForm.memberId"
              label="會員ID"
              lazy-rules
              v-show="false"
              style="padding: 0;width: 2%;font-size: 20px;"
              />
            </div>
                <div class="row justify-end  col-3">
                  <!-- <q-btn v-if="show" color="blue"  @click="show = !show"   class="q-ml-sm">{{ show ? '收起客戶資料' : '開啟客戶資料' }}</q-btn> -->
          <q-btn
                label="清除"
                type="reset"
                color="red"

                class="q-ml-sm"
                />
                <q-btn label="儲存" type="submit" color="primary"
                @click="savePerson"
                />
              </div>
            </div>
            </td>
          </tr>

        </table>

    </q-form>

  </div>
</q-dialog>
      <!-- 點單按鈕 -->
      <div class="row menu text-left" data-order-panel>
    <h5>請選擇餐點</h5>
    <q-btn
            color="pink-5"
            @click="addPerson"
            :disabled="isSubmitting"
            label="客戶資料"
        class="personBtn"
          />
    <q-btn
      @click="openbangdong"
      color="blue"
      >便當</q-btn>

          <q-btn
            color="blue"
            label="盒餐"
            @click="openlunchBox"

          />
          <q-btn
            color="blue"
            label="單點"
            @click="opensolo"

          />
          <q-btn
            color="blue"
            label="客製便當"
            @click="openCustomBangdong"

          />
          <q-btn
            color="blue"
            label="客製盒餐"
            @click="openCustomLunchBox"
          />
          <q-btn
            color="green"
            @click="addOrder"
            :disabled="isSubmitting"
            label="加入訂單"

          />

          <!-- 便當dailog -->
          <q-dialog v-model="showbangdong" class="lunchBoxdailog" >
          <q-card class="  items-start " id="dialogbtnBangdongCard">
            <!-- 便當按鈕 -->
            <div class="  items-center" id="bangdongbtn" >
              <q-btn color="blue" :label="bangdong1Name"  @click="showbangdong1 = true; showbangdong=false" />
              <q-btn color="blue" :label="bangdong2Name"  @click="showbangdong2 = true; showbangdong=false" />
              <q-btn color="blue" :label="bangdong3Name"  @click="showbangdong3 = true; showbangdong=false" />
              <q-btn color="blue" :label="bangdong4Name"  @click="showbangdong4 = true; showbangdong=false" />
              <q-btn color="blue" :label="bangdongVegetarian1Name"  @click="showbangdongVegetarian1 = true; showbangdong=false" />
              <q-btn color="blue" :label="bangdongVegetarian2Name"  @click="showbangdongVegetarian2 = true; showbangdong=false" />
            </div>
           <div  class="row justify-end q-ma-lg"> <q-btn color="red" label="取消" class="q-mt-md" @click="showbangdong = false" />
            </div>
          </q-card>
        </q-dialog>
        <!-- 招牌便當dialog -->
          <q-dialog v-model="showbangdong1"  >
            <q-card class="items-start  word-break " id="bangdongcard"
            style="padding: 0;margin:0"
            >
            <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong1MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong1Main, index) in bangdong1Mains" :key="index" class="flex-auto  " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong1Main.quantity"
    :label="bangdong1Main.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong1DrinkName }}</h5>
      <div class="row items-center" style="height:100%">
        <q-item v-for="(bangdong1Drink, index) in bangdong1Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong1Drink.quantity" :label="bangdong1Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdong1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong1SideDish, index) in bangdong1SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong1SideDish.quantity" :label="bangdong1SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;" >{{bangdong1Name}}</h5>

        <div class="row">
     <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong1Arbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong1TotalQuantity"
    label="數量總計"
    min="0"
    />

    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong1Price"
    label="商品單價"
    readonly
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong1TotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />
    </div>

    <!-- 按鈕 -->
    <div class="row justify-end" >
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdong1"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdong1 = false"
    class="q-mt-md"
    />

    </div >
  </div>
            </q-card>
        </q-dialog>
        <!-- 雞胸便當dailog -->
        <q-dialog v-model="showbangdong2"  >
    <q-card class="row items-start  word-break " id="bangdongcard" style="padding: 0;margin:0">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong2MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong2Main, index) in bangdong2Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong2Main.quantity"
    :label="bangdong2Main.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2Drink, index) in bangdong2Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2Drink.quantity" :label="bangdong2Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2BentoMain, index) in bangdong2BentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2BentoMain.quantity" :label="bangdong2BentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2SideDish, index) in bangdong2SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2SideDish.quantity" :label="bangdong2SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;" >{{bangdong2Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong2Arbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong2TotalQuantity"
    label="數量總計"
    min="0"
    />
    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong2Price"
    label="商品單價"
    readonly
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong2TotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />
    </div>

    <!-- 按鈕 -->
    <div class="row justify-end">
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdong2"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdong2 = false"
    class="q-mt-md"
    />

    </div >
  </div>

    </q-card>
  </q-dialog>
        <!-- 雞腿便當dailog -->
        <q-dialog v-model="showbangdong3"  >
    <q-card class="items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong3MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong3Main, index) in bangdong3Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong3Main.quantity"
    :label="bangdong3Main.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong3DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong3Drink, index) in bangdong3Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong3Drink.quantity" :label="bangdong3Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div  class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong3BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong3BentoMain, index) in bangdong3BentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong3BentoMain.quantity" :label="bangdong3BentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdong3SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong3SideDish, index) in bangdong3SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong3SideDish.quantity" :label="bangdong3SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;">{{bangdong3Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong3Arbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong3TotalQuantity"
    label="數量總計"
    min="0"
    />
    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong3Price"
    label="商品單價"
    readonly
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong3TotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdong3"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdong3 = false"
    class="q-mt-md"
    />

    </div >
  </div>
    </q-card>
  </q-dialog>
         <!-- 滷牛便當dailog -->
         <q-dialog v-model="showbangdong4"  >
    <q-card class=" items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong4MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong4Main, index) in bangdong4Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong4Main.quantity"
    :label="bangdong4Main.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong4DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong4Drink, index) in bangdong4Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong4Drink.quantity" :label="bangdong4Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong4BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong4BentoMain, index) in bangdong4BentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong4BentoMain.quantity" :label="bangdong4BentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div  class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdong4SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong4SideDish, index) in bangdong4SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong4SideDish.quantity" :label="bangdong4SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;" >{{bangdong4Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong4Arbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong4TotalQuantity"
    label="數量總計"
    min="0"
    />
    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong4Price"
    label="商品單價"
    readonly
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong4TotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />

    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdong4"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdong4 = false"
    class="q-mt-md"
    />

    </div >
  </div>
    </q-card>
  </q-dialog>
  <!-- 素食便當125dialog -->
<q-dialog v-model="showbangdongVegetarian1">
  <q-card class="items-start  word-break " id="bangdongcard">
    <div  class="bg-teal-2" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1MainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1Main, index) in bangdongVegetarian1Mains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1Main.quantity" :label="bangdongVegetarian1Main.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1Drink, index) in bangdongVegetarian1Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1Drink.quantity" :label="bangdongVegetarian1Drink.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
          <!-- 副主餐 -->
          <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongVegetarian1BentoMain, index) in bangdongVegetarian1BentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongVegetarian1BentoMain.quantity" :label="bangdongVegetarian1BentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1SideDish, index) in bangdongVegetarian1SideDishes" :key="index"
          class="flex-auto " style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1SideDish.quantity" :label="bangdongVegetarian1SideDish.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
      <h5 style="margin: 0; padding: 0;" >{{bangdongVegetarian1Name}}</h5>

    <div class="row">
      <q-input outlined type="number" :input-style="{fontSize:'20px'}" style="width:130px"
        v-model.number="bangdongVegetarian1Arbitrarily" label="任意搭配" min="0" />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model="bangdongVegetarian1TotalQuantity" label="數量總計" min="0" />

      <q-input min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian1Price" label="商品單價" readonly />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian1TotalQuantityPrice" label="金額總計" readonly min="0" />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary" label="送出" type="submit" class="q-mt-md" @click="submitBangdongVegetarian1" />
      <q-btn color="red" label="取消" @click="showbangdongVegetarian1 = false" class="q-mt-md" />

    </div>
  </div>
  </q-card>
</q-dialog>
<!-- 素食便當150dialog -->
<q-dialog v-model="showbangdongVegetarian2">
  <q-card class=" items-start  word-break " id="bangdongcard">
    <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2MainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2Main, index) in bangdongVegetarian2Mains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2Main.quantity" :label="bangdongVegetarian2Main.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2Drink, index) in bangdongVegetarian2Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2Drink.quantity" :label="bangdongVegetarian2Drink.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
          <!-- 副主餐 -->
          <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongVegetarian2BentoMain, index) in bangdongVegetarian2BentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongVegetarian2BentoMain.quantity" :label="bangdongVegetarian2BentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2SideDish, index) in bangdongVegetarian2SideDishes" :key="index"
          class="flex-auto " style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2SideDish.quantity" :label="bangdongVegetarian2SideDish.name" outlined
            type="number" :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
            style="width: 130px;" min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
      <h5 style="margin: 0; padding: 0;" >{{bangdongVegetarian2Name}}</h5>

    <div class="row">
      <q-input outlined type="number" :input-style="{fontSize:'20px'}" style="width:130px"
        v-model.number="bangdongVegetarian2Arbitrarily" label="任意搭配" min="0" />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2TotalQuantity" label="數量總計" min="0" />

      <q-input min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2Price" label="商品單價" readonly />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2TotalQuantityPrice" label="金額總計" readonly min="0" />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary" label="送出" type="submit" class="q-mt-md" @click="submitBangdongVegetarian2" />
      <q-btn color="red" label="取消" @click="showbangdongVegetarian2 = false" class="q-mt-md" />

    </div>
  </div>
  </q-card>
</q-dialog>
        <!-- 盒餐dailog -->
        <q-dialog v-model="showlunchBox" class="lunchBoxdailog" >
    <q-card class="  items-start " id="dialogbtnCard">
      <!-- 盒餐按鈕 -->
      <div class="col  items-center" id="lunchboxbtn" >
        <q-btn color="blue" :label="lunchBox1Name"  @click="showlunchBox1 = true; showlunchBox=false" />
        <q-btn color="blue" :label="lunchBox2Name"  @click="showlunchBox2 = true; showlunchBox=false" />
        <q-btn color="blue" :label="lunchBox3Name"  @click="showlunchBox3 = true; showlunchBox=false" />
        <q-btn color="blue" :label="lunchBox4Name"  @click="showlunchBox4 = true; showlunchBox=false" />
      </div>
     <div  class="row justify-end q-ma-lg"> <q-btn color="red" label="取消" class="q-mt-md" @click="showlunchBox = false" />
      </div>
    </q-card>
  </q-dialog>

        <!-- 經濟盒餐dailog -->
        <q-dialog v-model="showlunchBox1"   full-width >
    <!-- 主餐 -->
    <q-card style="overflow-x:hidden">
      <div class="q-gutter-xs row items-start justify-center" id="lunchbox1">
        <div v-for="(lunchBox1Main, index) in lunchBox1Mains" :key="index" :class="getBackgroundColor(index)">
          <h5 style="margin: 0; padding: 0;">{{ lunchBox1Main.name }}</h5>
          <q-input v-model.number="lunchBox1Main.quantity" :label="lunchBox1Main.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
             />
          <h5 style="margin: 0; padding: 0;">{{ lunchBox1DrinkName }}</h5>
          <div v-for="(lunchBox1Drink, drinkIndex) in lunchBox1Main.drinks" :key="drinkIndex">
            <q-input v-model.number="lunchBox1Drink.quantity" :label="lunchBox1Drink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
          </div>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox1SideDishName }}</h5>
        <div class="row items-center ">
          <q-item v-for="(lunchBox1SideDish, index) in lunchBox1SideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="lunchBox1SideDish.quantity" :label="lunchBox1SideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"
               />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;">{{lunchBox1Name}}</h5>
        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox1Arbitrarily"
    label="任意搭配"
    min="0"
    />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox1TotalQuantity" label="數量總計"
            min="0"
            />
            <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox1Price"
            label="商品單價"
            readonly
            />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox1TotalQuantityPrice" label="金額總計" readonly
            min="0"
            />
        </div>

      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn color="primary"
        label="送出"
        type="submit"
        class="q-mt-md"
        @click="submitLunchbox1"
        />
        <q-btn
        color="red"
        label="取消"
        @click="showlunchBox1 = false"
        class="q-mt-md"
        />
      </div>
    </div>
    </q-card>
      </q-dialog>

      <!-- 會議盒餐dailog -->
      <q-dialog v-model="showlunchBox2"   full-width >
         <!-- 主餐 -->
    <q-card style="overflow-x:hidden" >
      <div class="q-gutter-xs row items-start justify-center" id="lunchbox2">
        <div v-for="(lunchBox2Main, index) in lunchBox2Mains" :key="index" :class="getBackgroundColor(index)">
          <h5 style="margin: 0; padding: 0;">{{ lunchBox2Main.name }}</h5>
          <q-input v-model.number="lunchBox2Main.quantity" :label="lunchBox2Main.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
          <h5 style="margin: 0; padding: 0;">{{ lunchBox2DrinkName }}</h5>
          <div v-for="(lunchBox2Drink, drinkIndex) in lunchBox2Main.drinks" :key="drinkIndex">
            <q-input v-model.number="lunchBox2Drink.quantity" :label="lunchBox2Drink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
          </div>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox2SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(lunchBox2SideDish, index) in lunchBox2SideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="lunchBox2SideDish.quantity" :label="lunchBox2SideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"
               />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;">{{lunchBox2Name}}</h5>
        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox2Arbitrarily"
    label="任意搭配"
    min="0"
    />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox2TotalQuantity" label="數量總計"
            min="0"
             />
             <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox2Price"
            label="商品單價"
            readonly
            />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox2TotalQuantityPrice" label="金額總計" readonly
            min="0"
            />
        </div>

      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn color="primary"
        label="送出"
        type="submit"
        class="q-mt-md"
        @click="submitLunchbox2"
        />
        <q-btn
        color="red"
        label="取消"
        @click="showlunchBox2 = false"
        class="q-mt-md"
        />
      </div>
    </div>
    </q-card>
      </q-dialog>
          <!-- 貴賓盒餐dailog -->
          <q-dialog v-model="showlunchBox3"   full-width >
    <!-- 主餐 -->
    <q-card style="overflow-x:hidden">
      <div class="q-gutter-xs row items-start justify-center" id="lunchbox3">
        <div v-for="(lunchBox3Main, index) in lunchBox3Mains" :key="index" :class="getBackgroundColor(index)">
          <h5 style="margin: 0; padding: 0;">{{ lunchBox3Main.name }}</h5>
          <q-input v-model.number="lunchBox3Main.quantity" :label="lunchBox3Main.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
          <h5 style="margin: 0; padding: 0;">{{ lunchBox3DrinkName }}</h5>
          <div v-for="(lunchBox3Drink, drinkIndex) in lunchBox3Main.drinks" :key="drinkIndex">
            <q-input v-model.number="lunchBox3Drink.quantity" :label="lunchBox3Drink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"/>
          </div>
        </div>
      </div>
      <!-- 配菜 -->
      <div c class="bg-teal-3" style="width:100%;padding: 0;">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox3SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(lunchBox3SideDish, index) in lunchBox3SideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="lunchBox3SideDish.quantity" :label="lunchBox3SideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"
               />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;">{{lunchBox3Name}}</h5>
        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox3Arbitrarily"
    label="任意搭配"
    min="0"
    />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox3TotalQuantity" label="數量總計"
            min="0"/>
            <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox3Price"
            label="商品單價"
            readonly
            />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox3TotalQuantityPrice" label="金額總計" readonly
            min="0"/>
        </div>

      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn color="primary"
        label="送出"
        type="submit"
        class="q-mt-md"
        @click="submitLunchbox3"
        />
        <q-btn
        color="red"
        label="取消"
        @click="showlunchBox3 = false"
        class="q-mt-md"
        />
      </div>
    </div>
    </q-card>
          </q-dialog>
              <!-- 首席盒餐dailog -->
              <q-dialog v-model="showlunchBox4"   full-width >
   <!-- 主餐 -->
   <q-card style="overflow-x:hidden">
      <div class="q-gutter-xs row items-start justify-center" id="lunchbox4">
        <div v-for="(lunchBox4Main, index) in lunchBox4Mains" :key="index" :class="getBackgroundColor(index)">
          <h5 style="margin: 0; padding: 0;">{{ lunchBox4Main.name }}</h5>
          <q-input v-model.number="lunchBox4Main.quantity" :label="lunchBox4Main.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
          <h5 style="margin: 0; padding: 0;">{{ lunchBox4DrinkName }}</h5>
          <div v-for="(lunchBox4Drink, drinkIndex) in lunchBox4Main.drinks" :key="drinkIndex">
            <q-input v-model.number="lunchBox4Drink.quantity" :label="lunchBox4Drink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"
              />
          </div>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox4SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(lunchBox4SideDish, index) in lunchBox4SideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="lunchBox4SideDish.quantity" :label="lunchBox4SideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
              min="0"
               />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;">{{lunchBox4Name}}</h5>
        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox4Arbitrarily"
    label="任意搭配"
    min="0"
    />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox4TotalQuantity" label="數量總計"
            min="0"
            />
            <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox4Price"
            label="商品單價"
            readonly
            />
          <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBox4TotalQuantityPrice" label="金額總計" readonly
            min="0"
            />
        </div>

      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn color="primary"
        label="送出"
        type="submit"
        class="q-mt-md"
        @click="submitLunchbox4"
        />
        <q-btn
        color="red"
        label="取消"
        @click="showlunchBox4 = false"
        class="q-mt-md"
        />
      </div>
    </div>
    </q-card>
            </q-dialog>

          <!-- 單點dailog -->

        <q-dialog v-model="showbangdongSolo" >
          <q-card class="q-gutter-md row items-start  word-break " >
   <!-- 6吋潤餅 -->
   <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;" >{{ bangdongSolo6inchName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdongSolo6inch, index) in bangdongSolo6inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    min="0"

    v-model.number="bangdongSolo6inch.quantity"
    :label="bangdongSolo6inch.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      />
    </q-item>
    </div>
    </div>
    <!-- 3吋潤餅 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;" >{{ bangdongSolo3inchName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdongSolo3inch, index) in bangdongSolo3inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    min="0"

    v-model.number="bangdongSolo3inch.quantity"
    :label="bangdongSolo3inch.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;" >{{ bangdongSoloDrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongSoloDrink, index) in bangdongSoloDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongSoloDrink.quantity" :label="bangdongSoloDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongSoloBentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongSoloBentoMain, index) in bangdongSoloBentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongSoloBentoMain.quantity" :label="bangdongSoloBentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongSoloSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongSoloSideDish, index) in bangdongSoloSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongSoloSideDish.quantity" :label="bangdongSoloSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
      <!-- 環保袋 -->
      <div  class="bg-teal-4" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongSoloEcoBagName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongSoloEcoBag, index) in bangdongSoloEcoBags" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongSoloEcoBag.quantity" :label="bangdongSoloEcoBag.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
        </div>
      </div>
    <!-- 總計 -->
    <div  style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;">{{bangdongSoloName}}</h5>

        <div class="row">
          <!-- <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model="bangdongSoloArbitrarily"
    label="任意搭配"
    min="0"
    /> -->
    <q-input
    min="0"

    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdongSoloTotalQuantity"
    label="數量總計"
    />

    <q-input
    min="0"

    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdongSoloTotalQuantityPrice"
    label="金額總計"
    readonly
    />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdongSolo"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdongSolo = false"
    class="q-mt-md"
    />

    </div >
  </div>
            </q-card>
        </q-dialog>

                <!-- 客製便當dailog -->
                <q-dialog v-model="showbangdongCustom1" class="lunchBoxdailog"  >
                  <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard"
            >
  <!-- 主餐 -->
  <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdongCustom1Main, index) in bangdongCustom1Mains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    min="0"

    v-model.number="bangdongCustom1Main.quantity"
    :label="bangdongCustom1Main.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1Drink, index) in bangdongCustom1Drinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongCustom1Drink.quantity" :label="bangdongCustom1Drink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1BentoMain, index) in bangdongCustom1BentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0" v-model.number="bangdongCustom1BentoMain.quantity" :label="bangdongCustom1BentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongCustom1SideDish, index) in bangdongCustom1SideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input
          min="0"
           v-model.number="bangdongCustom1SideDish.quantity" :label="bangdongCustom1SideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;">{{bangdongCustom1Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdongCustom1Arbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    min="0"

    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdongCustom1TotalQuantity"
    label="數量總計"
    />
    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdongCustom1Price"
    label="商品單價"
    />
    <q-input
    min="0"
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdongCustom1TotalQuantityPrice"
    label="金額總計"
    readonly
    />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
    <q-btn
    color="primary"
    label="送出"
    type="submit"
    class="q-mt-md"
    @click="submitBangdongCustom1"
    />
    <q-btn
    color="red"
    label="取消"
    @click="showbangdongCustom1 = false"
    class="q-mt-md"
    />

    </div >
  </div>
            </q-card>
        </q-dialog>

              <!-- 客製盒餐dailog -->
              <q-dialog v-model="showLunchBoxCustom1" class="lunchBoxdailog"  full-width >
     <!-- 主餐 -->
     <q-card style="overflow-x:hidden">
      <div class="q-gutter-xs row items-start justify-center" id="lunchboxCustom1">
        <div v-for="(lunchBoxCustom1Main, index) in lunchBoxCustom1Mains" :key="index" :class="getBackgroundColor(index)">
          <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1Main.name }}</h5>
          <q-input
          min="0"
           v-model.number="lunchBoxCustom1Main.quantity" :label="lunchBoxCustom1Main.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
          <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1DrinkName }}</h5>
          <div v-for="(lunchBoxCustom1Drink, drinkIndex) in lunchBoxCustom1Main.drinks" :key="drinkIndex">
            <q-input
            min="0"
             v-model.number="lunchBoxCustom1Drink.quantity" :label="lunchBoxCustom1Drink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
          </div>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(lunchBoxCustom1SideDish, index) in lunchBoxCustom1SideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input
            min="0"
             v-model.number="lunchBoxCustom1SideDish.quantity" :label="lunchBoxCustom1SideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
        <h5 style="margin: 0; padding: 0;">{{lunchBoxCustom1Name}}</h5>
        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBoxCustom1Arbitrarily"
    label="任意搭配"
    min="0"
    />
          <q-input
          min="0"
           outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBoxCustom1TotalQuantity" label="數量總計" />
          <q-input
          min="0"
           outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBoxCustom1Price" label="商品單價"  />
          <q-input
          min="0"
           outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
            v-model.number="lunchBoxCustom1TotalQuantityPrice" label="金額總計" readonly />
        </div>

      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn color="primary"
        label="送出"
        type="submit"
        class="q-mt-md"
        @click="submitLunchboxCustom1"
        />
        <q-btn
        color="red"
        label="取消"
        @click="showLunchBoxCustom1 = false"
        class="q-mt-md"
        />
      </div>
    </div>
    </q-card>
  </q-dialog>

    </div>
  <!-- 訂單區 -->
      <div class="row">
        <!-- 訂單顯示 -->
        <div class="col p-4 slider" data-order-lists>
          <!-- table訂單區域 -->

          <div class="row justify-center">
            <div class="col-12">
              <div class="q-pa-xs " >
     <q-table :rows="tableRows"
    :style="{ maxHeight: show ? 'calc(30vh)' : 'calc(68vh)' }"
        title="商品訂單"
        row-key="fat"
        virtual-scroll
        v-model:pagination="pagination"
        :rows-per-page-options="[0]"
        id="sliderTable"
        no-data-label="目前沒有訂單">
        <template v-slot:top>
                <q-toolbar>
                  <q-toolbar-title class="row flex-around"><h3 style="margin:0">訂單</h3>
                    <div>
                    <q-select
                  outlined
                  v-model="personForm.orderStatu"
                  label="訂單狀態"
                  :options="orderStatus"
                  lazy-rules
                  style="padding: 0;width: 150px;font-size: 20px;"
              />
              </div>
                  </q-toolbar-title>
                  <q-space />

           <h class="row tableMember" >
            <p v-if="personForm.memberId" >會員編號: {{ personForm.memberId }}</p>
    <p v-if="personForm.name">訂購人: {{ personForm.name }}</p>
    <p v-if="personForm.tel">訂購人電話: {{ personForm.tel }}</p>
    <p v-if="personForm.hometel">訂購人室內電話: {{personForm.prefix}}  {{ personForm.hometel }} #{{personForm.hometel2}}</p>
  </h>

                </q-toolbar>
              </template>
      <template #header>
        <q-tr>
          <q-th style="font-size:15px;width:100px">順序</q-th>
          <q-th style="font-size:20px;width:200px">商品</q-th>
          <q-th style="font-size:20px;width:300px">搭配</q-th>
          <q-th style="font-size:20px;width:300px">飲料</q-th>
          <q-th style="font-size:20px;width:300px">副主餐</q-th>
          <q-th style="font-size:20px;width:100px">金額</q-th>
          <q-th style="font-size:20px;width:100px">操作</q-th>
        </q-tr>
      </template>

      <template #body="props">
        <q-tr :props="props">
          <q-td style="text-align: center;font-size:20px;max-width:100px">{{ props.row.id }}</q-td>
          <q-td style="text-align: center;font-size:20px">
            {{ props.row.name }}
            <div v-for="(input, index) in props.row.inputs" :key="index" style="text-align: center;font-size:20px">
              <input type="hidden" :name="input.name" v-model="input.value"
              >
            </div>
          </q-td>
          <q-td style="text-align: center;font-size:20px;max-width:300px">{{ props.row.Main }}</q-td>
          <q-td style="text-align: center;font-size:20px;max-width:300px">{{ props.row.drinks }}</q-td>
          <q-td style="text-align: center;font-size:20px;max-width:300px">{{ props.row.bentoMains }}</q-td>
          <q-td style="text-align: center;font-size:20px;max-width:100px">{{ props.row.price }}
            <div v-for="(productInput, index) in props.row.productInputs" :key="index" style="text-align: center;font-size:20px">
              <input type="hidden" :name="productInput.name" v-model="productInput.value"
              >
            </div>
          </q-td>

          <q-td style="text-align: center;max-width:100px">
            <q-btn icon="delete"
            color="red"
            fab-mini
            unelevated
            size="md"
            @click="deleteRow(props.row.id)" />
            <q-btn icon="edit"
            fab-mini
            unelevated size="lg"
            color="info"
            @click="editRowDialog(props.row)"/>
          </q-td>
        </q-tr>
      </template>
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-blue-grey-7 q-gutter-sm">
          <q-icon size="2em" name="restaurant"></q-icon>
          <span style="font-size: 22px;">
            {{ message }}
          </span>
        </div>
      </template>
    </q-table>
              </div>
            </div>
          </div>
    <!-- 招牌便當修改dialog -->
    <q-dialog v-model="editDialog1"   >
    <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong1MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong1EditMain, index) in bangdong1EditMains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong1EditMain.quantity"
    :label="bangdong1EditMain.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong1DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong1EditDrink, index) in bangdong1EditDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong1EditDrink.quantity" :label="bangdong1EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong1EditSideDish, index) in bangdong1EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong1EditSideDish.quantity" :label="bangdong1EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0" class="bg-teal-12">
        <h5  style="margin: 0; padding: 0;" >{{bangdong1Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong1EditArbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong1EditTotalQuantity"
    label="數量總計"
    min="0"
    />
    <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdong1EditPrice" label="商品單價" readonly />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong1EditTotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn label="儲存" color="primary" @click="saveEditDialog1" />
      <q-btn label="取消" color="red" @click="closeEditDialog1" />

    </div >
  </div>
    </q-card>
  </q-dialog>

        <!-- 雞胸便當修改dialog -->
        <q-dialog v-model="editDialog2"   >
    <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
    <h5 style="margin: 0; padding: 0;">{{ bangdong2MainName }}</h5>
    <div class="row items-center"
    >
    <q-item  v-for="(bangdong2EditMain, index) in bangdong2EditMains" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
    <q-input
    v-model.number="bangdong2EditMain.quantity"
    :label="bangdong2EditMain.name"
    outlined
    type="number"
      :input-style="{ fontSize: '20px', margin: '0' }"
      :label-style="{ fontSize: '20px' }"
      style="width: 130px;"
      min="0"
      />
    </q-item>
    </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2EditDrink, index) in bangdong2EditDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2EditDrink.quantity" :label="bangdong2EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 副主餐 -->
    <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2BentoMainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2EditBentoMain, index) in bangdong2EditBentoMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2EditBentoMain.quantity" :label="bangdong2EditBentoMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdong2SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdong2EditSideDish, index) in bangdong2EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdong2EditSideDish.quantity" :label="bangdong2EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"
            />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div sstyle="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5  style="margin: 0; padding: 0;">{{bangdong3Name}}</h5>

        <div class="row">
          <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong2EditArbitrarily"
    label="任意搭配"
    min="0"
    />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong2EditTotalQuantity"
    label="數量總計"
    min="0"
    />
    <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdong2EditPrice" label="商品單價" readonly />
    <q-input
    outlined
    type="number"
    :input-style="{ fontSize: '20px' }"
    style="width: 130px;"
    v-model.number="bangdong2EditTotalQuantityPrice"
    label="金額總計"
    readonly
    min="0"
    />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn label="儲存" color="primary" @click="saveEditDialog2" />
      <q-btn label="取消" color="red" @click="closeEditDialog2" />

    </div >
  </div>
    </q-card>
  </q-dialog>

        <!-- 雞腿便當修改dialog -->
        <q-dialog v-model="editDialog3">
    <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong3MainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong3EditMain, index) in bangdong3EditMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong3EditMain.quantity" :label="bangdong3EditMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
      <!-- 飲料 -->
      <div  class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong3DrinkName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong3EditDrink, index) in bangdong3EditDrinks" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong3EditDrink.quantity" :label="bangdong3EditDrink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
      <!-- 副主餐 -->
      <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong3BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong3EditBentoMain, index) in bangdong3EditBentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong3EditBentoMain.quantity" :label="bangdong3EditBentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;margin:0">{{ bangdong3SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong3EditSideDish, index) in bangdong3EditSideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong3EditSideDish.quantity" :label="bangdong3EditSideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5 style="margin: 0; padding: 0;">{{bangdong3Name}}</h5>

      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong3EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdong3EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdong3EditPrice" label="商品單價" readonly />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdong3EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>
      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn label="儲存" color="primary" @click="saveEditDialog3" />
        <q-btn label="取消" color="red" @click="closeEditDialog3" />

      </div>
    </div>
    </q-card>
  </q-dialog>

       <!-- 滷牛修改dialog -->
       <q-dialog v-model="editDialog4">
    <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong4MainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong4EditMain, index) in bangdong4EditMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong4EditMain.quantity" :label="bangdong4EditMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 飲料 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong4DrinkName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong4EditDrink, index) in bangdong4EditDrinks" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong4EditDrink.quantity" :label="bangdong4EditDrink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0" />
          </q-item>
        </div>
      </div>
      <!-- 副主餐 -->
      <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong4BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong4EditBentoMain, index) in bangdong4EditBentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong4EditBentoMain.quantity" :label="bangdong4EditBentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdong4SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdong4EditSideDish, index) in bangdong4EditSideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdong4EditSideDish.quantity" :label="bangdong4EditSideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5 style="margin: 0; padding: 0;" >{{bangdong4Name}}</h5>

      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdong4EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdong4EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdong4EditPrice" label="商品單價" readonly />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdong4EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>
      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn label="儲存" color="primary" @click="saveEditDialog4" />
        <q-btn label="取消" color="red" @click="closeEditDialog4" />

      </div>
    </div>
    </q-card>
  </q-dialog>
  <!-- 素食便當125修改dialog -->
<q-dialog v-model="editDialogV1">
  <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
    <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1MainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1EditMain, index) in bangdongVegetarian1EditMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1EditMain.quantity" :label="bangdongVegetarian1EditMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 飲料 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1EditDrink, index) in bangdongVegetarian1EditDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1EditDrink.quantity" :label="bangdongVegetarian1EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
          <!-- 副主餐 -->
          <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongVegetarian1EditBentoMain, index) in bangdongVegetarian1EditBentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongVegetarian1EditBentoMain.quantity" :label="bangdongVegetarian1EditBentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin: 0;">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian1SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian1EditSideDish, index) in bangdongVegetarian1EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian1EditSideDish.quantity" :label="bangdongVegetarian1EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
      <h5 style="margin: 0; padding: 0;">{{bangdongVegetarian1Name}}</h5>

    <div class="row">
      <q-input outlined type="number" :input-style="{fontSize:'20px'}" style="width:130px"
        v-model.number="bangdongVegetarian1EditArbitrarily" label="任意搭配" min="0" />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian1EditTotalQuantity" label="數量總計" min="0" />
      <q-input min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian1EditPrice" label="商品單價" readonly />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian1EditTotalQuantityPrice" label="金額總計" readonly min="0" />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn label="儲存" color="primary" @click="saveEditDialogV1" />
      <q-btn label="取消" color="red" @click="closeEditDialogV1" />

    </div>
  </div>
  </q-card>
</q-dialog>
<!-- 素食便當150修改dialog -->
<q-dialog v-model="editDialogV2">
  <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
    <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2MainName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2EditMain, index) in bangdongVegetarian2EditMains" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2EditMain.quantity" :label="bangdongVegetarian2EditMain.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 飲料 -->
    <div>
      <h5 class="bg-teal-3" style="width:100%;padding: 0;margin:0">{{ bangdongVegetarian2DrinkName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2EditDrink, index) in bangdongVegetarian2EditDrinks" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2EditDrink.quantity" :label="bangdongVegetarian2EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
          <!-- 副主餐 -->
          <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongVegetarian2EditBentoMain, index) in bangdongVegetarian2EditBentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongVegetarian2EditBentoMain.quantity" :label="bangdongVegetarian2EditBentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"
              />
          </q-item>
        </div>
      </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ bangdongVegetarian2SideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(bangdongVegetarian2EditSideDish, index) in bangdongVegetarian2EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="bangdongVegetarian2EditSideDish.quantity" :label="bangdongVegetarian2EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0" />
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
      <h5 style="margin: 0; padding: 0;">{{bangdongVegetarian2Name}}</h5>

    <div class="row">
      <q-input outlined type="number" :input-style="{fontSize:'20px'}" style="width:130px"
        v-model.number="bangdongVegetarian2EditArbitrarily" label="任意搭配" min="0" />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2EditTotalQuantity" label="數量總計" min="0" />
      <q-input min="0" outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2EditPrice" label="商品單價" readonly />
      <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongVegetarian2EditTotalQuantityPrice" label="金額總計" readonly min="0" />
    </div>
    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn label="儲存" color="primary" @click="saveEditDialogV2" />
      <q-btn label="取消" color="red" @click="closeEditDialogV2" />

    </div>
  </div>
  </q-card>
</q-dialog>
   <!-- 客製招牌便當修改dialog -->
   <q-dialog v-model="editDialog9">
    <q-card class="q-gutter-md row items-start  word-break " id="bangdongcard">
      <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1MainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongCustom1EditMain, index) in bangdongCustom1EditMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongCustom1EditMain.quantity" :label="bangdongCustom1EditMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 飲料 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1DrinkName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongCustom1EditDrink, index) in bangdongCustom1EditDrinks" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongCustom1EditDrink.quantity" :label="bangdongCustom1EditDrink.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0" />
          </q-item>
        </div>
      </div>
      <!-- 副主餐 -->
      <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1BentoMainName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongCustom1EditBentoMain, index) in bangdongCustom1EditBentoMains" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongCustom1EditBentoMain.quantity" :label="bangdongCustom1EditBentoMain.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 配菜 -->
      <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
        <h5 style="margin: 0; padding: 0;">{{ bangdongCustom1SideDishName }}</h5>
        <div class="row items-center">
          <q-item v-for="(bangdongCustom1EditSideDish, index) in bangdongCustom1EditSideDishes" :key="index" class="flex-auto "
            style="margin: 0; padding: 0;">
            <q-input v-model.number="bangdongCustom1EditSideDish.quantity" :label="bangdongCustom1EditSideDish.name" outlined type="number"
              :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }"
              style="width: 130px;"
              min="0"/>
          </q-item>
        </div>
      </div>
      <!-- 總計 -->
      <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-11">
        <h5 style="margin: 0; padding: 0;">{{bangdongCustom1Name}}</h5>

      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdongCustom1EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdongCustom1EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="bangdongCustom1EditPrice" label="商品單價"  />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="bangdongCustom1EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>
      <!-- 按鈕 -->
      <div class="row justify-end" style="width: 100%;">
        <q-btn label="儲存" color="primary" @click="saveEditDialog9" />
        <q-btn label="取消" color="red" @click="closeEditDialog9" />

      </div>
    </div>
    </q-card>
  </q-dialog>
  <!-- 經濟盒餐修改dialog -->
  <q-dialog v-model="editDialog5" full-width>
      <q-card >
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox1">
      <div v-for="(lunchBox1EditMain, index) in lunchBox1EditMains" :key="index" :class="getBackgroundColor(index)">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditMain.name }}</h5>
        <q-input v-model.number="lunchBox1EditMain.quantity" :label="lunchBox1EditMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"
          />
        <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditDrinkName }}</h5>
        <div v-for="(lunchBox1EditDrink, drinkIndex) in lunchBox1EditMain.drinks" :key="drinkIndex">
          <q-input v-model.number="lunchBox1EditDrink.quantity" :label="lunchBox1EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div  class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox1EditSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox1EditSideDish, index) in lunchBox1EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="lunchBox1EditSideDish.quantity" :label="lunchBox1EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
      <h5 style="margin: 0; padding: 0;">{{lunchBox1EditName}}</h5>
      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox1EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox1EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox1EditPrice"
            label="商品單價"
            readonly
            />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox1EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>

    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="儲存"
      type="submit"
      class="q-mt-md"
      @click="saveEditDialog5"
      />
      <q-btn
      color="red"
      label="取消"
      @click="closeEditDialog5"
      class="q-mt-md"
      />
    </div>
  </div>
  </q-card>

    </q-dialog>
  <!-- 會議盒餐 -->
  <q-dialog v-model="editDialog6" full-width>
      <q-card >
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox2Edit">
      <div v-for="(lunchBox2EditMain, index) in lunchBox2EditMains" :key="index" :class="getBackgroundColor(index)">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditMain.name }}</h5>
        <q-input v-model.number="lunchBox2EditMain.quantity" :label="lunchBox2EditMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
        <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditDrinkName }}</h5>
        <div v-for="(lunchBox2EditDrink, drinkIndex) in lunchBox2EditMain.drinks" :key="drinkIndex">
          <q-input v-model.number="lunchBox2EditDrink.quantity" :label="lunchBox2EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox2EditSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox2EditSideDish, index) in lunchBox2EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="lunchBox2EditSideDish.quantity" :label="lunchBox2EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
      <h5 style="margin: 0; padding: 0;">{{lunchBox2EditName}}</h5>
      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox2EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox2EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox2EditPrice"
            label="商品單價"
            readonly
            />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox2EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>

    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="儲存"
      type="submit"
      class="q-mt-md"
      @click="saveEditDialog6"
      />
      <q-btn
      color="red"
      label="取消"
      @click="closeEditDialog6"
      class="q-mt-md"
      />
    </div>
  </div>
  </q-card>

    </q-dialog>
    <!-- 貴賓盒餐 -->
    <q-dialog v-model="editDialog7" full-width>
      <q-card >
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox3Edit">
      <div v-for="(lunchBox3EditMain, index) in lunchBox3EditMains" :key="index" :class="getBackgroundColor(index)">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditMain.name }}</h5>
        <q-input v-model.number="lunchBox3EditMain.quantity" :label="lunchBox3EditMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
        <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditDrinkName }}</h5>
        <div v-for="(lunchBox3EditDrink, drinkIndex) in lunchBox3EditMain.drinks" :key="drinkIndex">
          <q-input v-model.number="lunchBox3EditDrink.quantity" :label="lunchBox3EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox3EditSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox3EditSideDish, index) in lunchBox3EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="lunchBox3EditSideDish.quantity" :label="lunchBox3EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
      <h5 style="margin: 0; padding: 0;">{{lunchBox3EditName}}</h5>
      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox3EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox3EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox3EditPrice"
            label="商品單價"
            readonly
            />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox3EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>

    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="儲存"
      type="submit"
      class="q-mt-md"
      @click="saveEditDialog7"
      />
      <q-btn
      color="red"
      label="取消"
      @click="closeEditDialog7"
      class="q-mt-md"
      />
    </div>
  </div>
  </q-card>

    </q-dialog>
    <!-- 首席盒餐 -->
    <q-dialog v-model="editDialog8" full-width>
      <q-card >
    <div class="q-gutter-xs row items-start justify-center" id="lunchbox1Edit">
      <div v-for="(lunchBox4EditMain, index) in lunchBox4EditMains" :key="index" :class="getBackgroundColor(index)">
        <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditMain.name }}</h5>
        <q-input v-model.number="lunchBox4EditMain.quantity" :label="lunchBox4EditMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
        <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditDrinkName }}</h5>
        <div v-for="(lunchBox4EditDrink, drinkIndex) in lunchBox4EditMain.drinks" :key="drinkIndex">
          <q-input v-model.number="lunchBox4EditDrink.quantity" :label="lunchBox4EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ lunchBox4EditSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBox4EditSideDish, index) in lunchBox4EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="lunchBox4EditSideDish.quantity" :label="lunchBox4EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
      <h5 style="margin: 0; padding: 0;">{{lunchBox4EditName}}</h5>
      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBox4EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox4EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
            min="0"
            outlined
            type="number"
            :input-style="{ fontSize: '20px' }"
            style="width: 130px;"
            v-model.number="lunchBox4EditPrice"
            label="商品單價"
            readonly
            />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBox1EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>

    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="儲存"
      type="submit"
      class="q-mt-md"
      @click="saveEditDialog8"
      />
      <q-btn
      color="red"
      label="取消"
      @click="closeEditDialog8"
      class="q-mt-md"
      />
    </div>
  </div>
  </q-card>

    </q-dialog>
     <!-- 客製盒餐修改dialog -->
     <q-dialog v-model="editDialog0" full-width>
      <q-card >
    <div class="q-gutter-xs row items-start justify-center" id="lunchBoxCustom1Edit">
      <div v-for="(lunchBoxCustom1EditMain, index) in lunchBoxCustom1EditMains" :key="index" :class="getBackgroundColor(index)">
        <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditMain.name }}</h5>
        <q-input v-model.number="lunchBoxCustom1EditMain.quantity" :label="lunchBoxCustom1EditMain.name" outlined type="number"
          :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
          min="0"/>
        <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditDrinkName }}</h5>
        <div v-for="(lunchBoxCustom1EditDrink, drinkIndex) in lunchBoxCustom1EditMain.drinks" :key="drinkIndex">
          <q-input v-model.number="lunchBoxCustom1EditDrink.quantity" :label="lunchBoxCustom1EditDrink.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </div>
      </div>
    </div>
    <!-- 配菜 -->
    <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
      <h5 style="margin: 0; padding: 0;">{{ lunchBoxCustom1EditSideDishName }}</h5>
      <div class="row items-center">
        <q-item v-for="(lunchBoxCustom1EditSideDish, index) in lunchBoxCustom1EditSideDishes" :key="index" class="flex-auto "
          style="margin: 0; padding: 0;">
          <q-input v-model.number="lunchBoxCustom1EditSideDish.quantity" :label="lunchBoxCustom1EditSideDish.name" outlined type="number"
            :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;"
            min="0"/>
        </q-item>
      </div>
    </div>
    <!-- 總計 -->
    <div style="width:100%;padding: 0;margin: 0;" class="bg-teal-12">
      <h5 style="margin: 0; padding: 0;">{{lunchBoxCustom1EditName}}</h5>
      <div class="row">
        <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="lunchBoxCustom1EditArbitrarily"
    label="任意搭配"
    min="0"
    />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBoxCustom1EditTotalQuantity" label="數量總計"
          min="0"/>
          <q-input
      min="0"
       outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
        v-model.number="lunchBoxCustom1EditPrice" label="商品單價"  />
        <q-input outlined type="number" :input-style="{ fontSize: '20px' }" style="width: 130px;"
          v-model.number="lunchBoxCustom1EditTotalQuantityPrice" label="金額總計" readonly
          min="0"/>
      </div>

    <!-- 按鈕 -->
    <div class="row justify-end" style="width: 100%;">
      <q-btn color="primary"
      label="儲存"
      type="submit"
      class="q-mt-md"
      @click="saveEditDialog0"
      />
      <q-btn
      color="red"
      label="取消"
      @click="closeEditDialog0"
      class="q-mt-md"
      />
    </div>
  </div>
  </q-card>

    </q-dialog>
      <!-- 單點修改dialog -->
      <q-dialog v-model="editDialog10" >
    <q-card class="q-gutter-md row items-start  word-break " >
  <!-- 6吋潤餅 -->
  <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSolo6inchName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdongSoloEdit6inch, index) in bangdongSoloEdit6inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model.number="bangdongSoloEdit6inch.quantity"
  :label="bangdongSoloEdit6inch.name"
  outlined
  type="number"
  :input-style="{ fontSize: '20px', margin: '0' }"
  :label-style="{ fontSize: '20px' }"
  style="width: 130px;"
  />
  </q-item>
  </div>
  </div>
  <!-- 3吋潤餅 -->
  <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSolo3inchName }}</h5>
  <div class="row items-center"
  >
  <q-item  v-for="(bangdongSoloEdit3inch, index) in bangdongSoloEdit3inchs" :key="index" class="flex-auto " style="margin: 0; padding: 0;">
  <q-input
  min="0"

  v-model.number="bangdongSoloEdit3inch.quantity"
  :label="bangdongSoloEdit3inch.name"
  outlined
  type="number"
  :input-style="{ fontSize: '20px', margin: '0' }"
  :label-style="{ fontSize: '20px' }"
  style="width: 130px;"
  />
  </q-item>
  </div>
  </div>
  <!-- 飲料 -->
  <div class="bg-teal-11" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSoloDrinkName }}</h5>
  <div class="row items-center">
  <q-item v-for="(bangdongSoloEditDrink, index) in bangdongSoloEditDrinks" :key="index" class="flex-auto "
    style="margin: 0; padding: 0;">
    <q-input
    min="0"
     v-model.number="bangdongSoloEditDrink.quantity" :label="bangdongSoloEditDrink.name" outlined type="number"
      :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
  </q-item>
  </div>
  </div>
  <!-- 副主餐 -->
  <div class="bg-teal-2" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSoloBentoMainName }}</h5>
  <div class="row items-center">
  <q-item v-for="(bangdongSoloEditBentoMain, index) in bangdongSoloEditBentoMains" :key="index" class="flex-auto "
    style="margin: 0; padding: 0;">
    <q-input
    min="0"
     v-model.number="bangdongSoloEditBentoMain.quantity" :label="bangdongSoloEditBentoMain.name" outlined type="number"
      :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
  </q-item>
  </div>
  </div>
  <!-- 配菜 -->
  <div class="bg-teal-3" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSoloSideDishName }}</h5>
  <div class="row items-center">
  <q-item v-for="(bangdongSoloEditSideDish, index) in bangdongSoloEditSideDishes" :key="index" class="flex-auto "
    style="margin: 0; padding: 0;">
    <q-input
    min="0"
     v-model.number="bangdongSoloEditSideDish.quantity" :label="bangdongSoloEditSideDish.name" outlined type="number"
      :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
  </q-item>
  </div>
  </div>
  <!-- 環保袋 -->
  <div class="bg-teal-4" style="width:100%;padding: 0;margin:0">
  <h5 style="margin: 0; padding: 0;">{{ bangdongSoloEcoBagName }}</h5>
  <div class="row items-center">
  <q-item v-for="(bangdongSoloEditEcoBag, index) in bangdongSoloEditEcoBags" :key="index" class="flex-auto "
    style="margin: 0; padding: 0;">
    <q-input
    min="0"
     v-model.number="bangdongSoloEditEcoBag.quantity" :label="bangdongSoloEditEcoBag.name" outlined type="number"
      :input-style="{ fontSize: '20px', margin: '0' }" :label-style="{ fontSize: '20px' }" style="width: 130px;" />
  </q-item>
  </div>
  </div>
  <!-- 總計 -->
  <div  class="bg-teal-11" style="width:100%;padding: 0;margin:0">
  <h5  style="margin: 0; padding: 0;">{{bangdongSoloName}}</h5>

  <div class="row">
    <!-- <q-input
    outlined
    type="number"
    :input-style="{fontSize:'20px'}"
    style="width:130px"
    v-model.number="bangdongSoloEditArbitrarily"
    label="任意搭配"
    min="0"
    /> -->
  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model.number="bangdongSoloEditTotalQuantity"
  label="數量總計"
  />

  <q-input
  min="0"

  outlined
  type="number"
  :input-style="{ fontSize: '20px' }"
  style="width: 130px;"
  v-model.number="bangdongSoloEditTotalQuantityPrice"
  label="金額總計"
  readonly
  />
  </div>
  <!-- 按鈕 -->
  <div class="row justify-end" style="width: 100%;">
  <q-btn
  color="primary"
  label="儲存"
  type="submit"
  class="q-mt-md"
  @click="saveEditDialog10"
  />
  <q-btn
  color="red"
  label="取消"
  @click="closeEditDialog10"
  class="q-mt-md"
  />

  </div >
</div>
      </q-card>
  </q-dialog>
          <!-- 商品備註 -->
          <div class="row justify-start">
            <q-input
        style="width: 100%; margin: 1px 5px; background-color: white;"
        v-model="mealRemark"
        type="text"
        label="餐點備註"
        :input-style="{ fontSize: '20px' }"
        @input="showDialog"
      />
    </div>
    <q-dialog v-model="dialogVisible" persistent>
    <q-card>
      <q-card-section>
        <q-input
          v-model="searchTerm"
          placeholder="搜尋..."
          dense
          class="q-mb-md"
        />
        <q-item
          v-for="option in filteredOptions"
          :key="option"
          clickable
          @click="selectOption(option)"
        >
          <q-item-section>
            <q-item-label>{{ option }}</q-item-label>
          </q-item-section>
        </q-item>
        <q-pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :min="1"
          :max="totalPages"
          :input="true"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="取消" color="primary" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>

          <!-- 結帳金額區域 -->
          <div class="row justify-center">
    <div class="col-12">
      <div class="q-pa-xs row justify-around ">
        <q-radio v-model="paymentMethod" val="cash" label="現金"  class="radio-option"/>
        <q-radio v-model="paymentMethod" val="wire" label="轉帳" class="radio-option" />
        <!-- <q-radio v-model="paymentMethod" val="credit" label="信用卡" class="radio-option" /> -->
        <q-radio v-model="paymentMethod" val="debt" label="賒帳"  class="radio-option"/>

        <q-input
      v-if="paymentMethod === 'debt'"
      v-model="getMoneyDate"
      outlined
      style="width:150px"
      label="收款日"
      mask="date"
      :input-style="{ fontSize: '16px' }"
    >               <template v-slot:append>
                  <q-icon name="calendar_today" class="cursor-pointer" style="width: 10px;">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="getMoneyDate" today-btn style="width:800px">
                        <div class="row items-center justify-end">
                          <q-btn label="取消" color="red" v-close-popup />
                          <q-btn v-close-popup label="確定" color="primary"  />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
        <div class="q-field row no-wrap items-center">
          <div class="col-auto" style="font-size: 20px;">運費</div>
          <q-input outlined v-model.number="freight"  style="width:90px"  />
        </div>
        <div class="q-field row no-wrap items-center">
          <div class="col-auto" style="font-size: 20px;">折扣</div>
          <q-input outlined v-model.number="discount"  style="width:90px"  />
        </div>
        <div class="q-field row no-wrap items-center">
          <div class="col-auto" style="font-size: 20px;">總金額</div>
          <q-input outlined v-model.number="total" readonly style="width:90px"  />
        </div>
        <div class="q-field row no-wrap items-center">
          <div class="col-auto" style="font-size: 20px;">已付金額</div>
          <q-input outlined v-model.number="paid" style="width:90px"  />
        </div>
        <div class="q-field row no-wrap items-center">
          <div class="col-auto" style="font-size: 20px;">未付餘額</div>
          <q-input outlined v-model.number="unpaid" readonly style="width:90px"   />
        </div>
      </div>
    </div>
  </div>

        </div>

  </div>
  </div>

  </template>

<script setup>
import { ref, watch, computed, reactive } from 'vue'
import { useQuasar, Dialog } from 'quasar'
import { apiAuth } from 'src/boot/axios'
const $q = useQuasar()
const date = ref('')

const getBackgroundColor = (index) => {
  if (index % 2 === 0) {
    return 'bg-teal-2' // 偶
  } else {
    return 'bg-purple-2' // 奇
  }
}

function updateProxy () {
  personForm.getDate = date.value
}

function save () {
  date.value = personForm.getDate
}
// 聯絡人區
const showPersonDialog = ref(false)
function addPerson () {
  showPersonDialog.value = true
}
// 路名輔助按鈕

function run2 (message) {
  personForm.road2 += message
}
// const show = ref(false)
// 訂購日期自動導入

const personForm = reactive({
  checkDate: '',
  formattedDate: '', // 日期抓取
  pick: '', // 取貨方式
  weekday: '', // 星期抓取
  getDate: '', // 送達日期
  week: '', // 星期
  companyClass: '', // 公司類別
  company: '', // 訂購公司
  compilation: '', // 統編
  name: '', // 訂購人
  tel: '', // 訂購人電話
  prefix: '', // 訂購人區碼
  hometel: '', // 訂購人住家電話
  hometel2: '', // 訂購人分機
  address: '', // 縣市
  address2: '', // 區域
  road: '', // 路名
  road2: '', // 門牌
  recipient: '', // 收件人
  recipientTel: '', // 收件人電話
  gender: '18', // 性別
  sameOrderCustomer: false, // 訂購人與收件人相同
  sameOrderCompany: false, // 訂購公司與收件公司相同
  noCompilation: false, // 統編勾選
  getCompany: '', // 收件公司
  event: [], // 活動
  remark: '', // 備註
  orderStatu: '請選擇', // 訂單狀態
  memberId: '', // 會員ID
  locationId: '重慶南'// 店家代號
})
const picks = reactive(['自取', '派送'])
const eventOptions = [
  '會議',
  '教會',
  '廟會',
  '婚禮',
  '喪禮',
  '生日',
  '滿月'
]

// 統編勾選變成唯讀並且清空

const isCompilationReadonly = computed(() => personForm.noCompilation === 'no')

watch(isCompilationReadonly, (newVal) => {
  if (newVal) {
    personForm.compilation = ''
  }
})
// 結帳區
const tableRows = reactive([])
const paymentMethod = ref('cash')
const paid = ref(0)
const total = ref(0)
const freight = ref(0)
const discount = ref(0)
const unpaid = ref(0)
const getMoneyDate = ref('')
const totalPrice = computed(() => {
  return tableRows.reduce((accumulator, row) => accumulator + row.price, 0) - parseInt(discount.value) + parseInt(freight.value)
})
const productPrice = computed(() => {
  return tableRows.reduce((accumulator, row) => accumulator + row.price, 0)
})

watch(totalPrice, (newTotalPrice) => {
  total.value = newTotalPrice
}, { immediate: true })

watch([total, paid], () => {
  unpaid.value = total.value - paid.value
}, { immediate: true })
// 抓取當日日期
function updateDateTime () {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1
  const date = now.getDate()
  personForm.formattedDate = `${year}/${month}/${date}`
}
setInterval(updateDateTime, 1000)
// 導入訂購日期的值
watch(() => personForm.formattedDate, (newValue) => {
  personForm.checkDate = newValue
})

// 偵測getDate後抓取星期自動導入

watch(() => personForm.getDate, (newVal) => {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const date = new Date(newVal)
  const dayOfWeek = days[date.getDay()]
  personForm.weekday = dayOfWeek
  personForm.week = personForm.weekday
  // console.log(weekday)
})
// watch(() => personForm.weekday, (newValue) => {
//   personForm.week = newValue
// })

const orderStatus = reactive([
  '未確認', '已確認', '已確待配', '未結清', '已結案', '作廢'
])// 訂單狀態
const locationIds = reactive([
  { label: '重慶南', value: 1 },
  { label: '和平', value: 2 }
])// 和平店

function onReset () {
  // 將表單的資料都重置為初始值
  personForm.checkDate = ''
  personForm.formattedDate = ''// 日期抓取
  personForm.pick = ''// 取貨方式
  personForm.weekday = ''// 星期抓取
  personForm.getDate = ''// 送達日期
  personForm.week = ''// 星期
  personForm.companyClass = ''// 公司類別
  personForm.company = ''// 訂購公司
  personForm.compilation = ''// 統編
  personForm.name = ''// 訂購人
  personForm.tel = ''// 訂購人電話
  // personForm.email = ''// 訂購人電子信箱
  personForm.prefix = '' // 訂購人區碼
  personForm.hometel = ''// 訂購人住家電話
  personForm.hometel2 = '' // 訂購人分機
  personForm.address = ''// 縣市
  personForm.address2 = ''// 區域
  personForm.road = ''// 路名
  personForm.recipient = ''// 收件人
  personForm.recipientTel = ''// 收件人電話
  personForm.gender = '18'// 性別
  personForm.sameOrderCustomer = false// 訂購人與收件人相同
  personForm.sameOrderCompany = false// 訂購公司與收件公司personForm.相同
  personForm.getCompany = ''// 收件公司
  personForm.event = []// 活動
  personForm.remark = ''// 備註
  personForm.orderStatu = '請選擇'// 訂單狀態
  personForm.locationId = '重慶南'// 店家代號
  // 重設其它狀態
  // ...
  personForm.memberId = ''// 會員ID
  personForm.time = ''// 時段
  personForm.noCompilation = false
}
// await new Promise(resolve => setTimeout(resolve, 1000)) // 每次等待1秒再繼續請求

// 縣市

const addressoptions = reactive([])

const address2Options = reactive([])
const roadOptions = reactive([])

// 取得縣市選項
const getAddressList = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('localization/division/state')
    addressoptions.splice(0, addressoptions.length, ...response.data.map(item => item.name))
  } catch (error) {
    console.error(error)
  }
}

// 取得區域選項
const getDistrictList = async (id) => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get(`localization/division/city?filter_parent_id=${id}`)
    if (!Array.isArray(response.data)) {
      throw new Error('response.data is not an array')
    }
    address2Options.splice(0, address2Options.length, ...response.data.map(item => item.name))
  } catch (error) {
    console.error(error)
  }
}

getAddressList()
// 獲取初始的縣市列表

const filterRoadOptions = async (search, update, abort) => {
  try {
    const state = personForm.address
    const district = personForm.address2

    if (state && district && search.length >= 0) {
      const stateId = addressoptions.findIndex(item => item === state) + 1
      const cityResponse = await apiAuth.get(`/localization/division/city?filter_parent_id=${stateId}`)
      const city = cityResponse.data.find(item => item.name === district)

      if (!city) {
        throw new Error('City not found')
      }

      const response = await apiAuth.get(`/localization/road?filter_state_id=${stateId}&filter_city_id=${city.city_id}&filter_name=${search}`)
      if (!Array.isArray(response.data)) {
        throw new Error('response.data is not an array')
      }

      const filteredOptions = response.data.map(item => item.name)
      update(() => {
        roadOptions.length = 0
        roadOptions.push(...filteredOptions)
      })
    } else {
      roadOptions.value.length = 0
    }
  } catch (error) {
    console.error(error)
  }
}

const selectRoadOptions = (value) => {
  // 處理選擇後路名邏輯

}

// 監聽獲取區域
watch(
  () => personForm.address,
  async (newValue, oldValue) => {
    // 清空区域和路名
    if (oldValue && newValue !== oldValue && !personForm.company) {
      personForm.address2 = ''
      personForm.road = ''
      personForm.road2 = ''
    }

    const stateId = addressoptions.findIndex(item => item === newValue) + 1
    await getDistrictList(stateId)
  }
)

// 監聽變化獲取路名
watch(
  () => [personForm.address, personForm.address2],
  async ([state, district], [oldState, oldDistrict]) => {
    // 清空路名
    if ((oldState && state !== oldState) || (oldDistrict && district !== oldDistrict && !personForm.company)) {
      if (!personForm.company) {
        personForm.road = ''
        personForm.road2 = ''
      }
    }

    const stateId = addressoptions.findIndex(item => item === state) + 1
    await filterRoadOptions(stateId, district)
  }
)

// 同訂購人按鈕
watch(() => personForm.sameOrderCustomer, (newVal) => {
  if (newVal) {
    personForm.recipient = personForm.name
    personForm.recipientTel = personForm.tel
  }
})
// 同訂購公司按鈕
watch(() => personForm.sameOrderCompany, (newVal) => {
  if (newVal) {
    personForm.getCompany = personForm.company
  }
})
// 統編搜尋帶入公司名稱
// 在用戶更改統編的時候，將isCompilationUserInput設置為true
watch(
  () => personForm.compilation,
  (newVal, oldVal) => {
    if (newVal !== oldVal) {
      isCompilationUserInput.value = true
    }
  }
)

watch(
  () => personForm.compilation,
  async (newVal) => {
    if (newVal && newVal.length === 8 && isCompilationUserInput.value && isCompilationUserInput2.value) {
      apiAuth
        .get(`/member/guin/autocomplete?filter_uniform_invoice_no=${newVal}`)
        .then((res) => {
          if (res.data && res.data.length) {
            // Set the company name
            personForm.company = res.data[0].name

            // Check if the address should be overwritten
            const shouldOverwrite = personForm.address || personForm.address2 || personForm.road || personForm.road2
            if (shouldOverwrite) {
              Dialog.create({
                title: '確認覆蓋地址',
                message: '是否要覆蓋已有的地址？',
                persistent: true,
                ok: '確定',
                cancel: '取消'
              }).onOk(() => {
                // Check if the company name is already set
                // If yes, do not clear the area and road name
                if (!personForm.company) {
                  personForm.address2 = ''
                  personForm.road = ''
                  personForm.road2 = ''
                }

                personForm.address = res.data[0].address_parts.full_city
                personForm.address2 = res.data[0].address_parts.full_district
                personForm.road = res.data[0].address_parts.full_road_section
                personForm.road2 = res.data[0].address_parts.after_road_section
              }).onCancel(() => {
                // 用户取消时不做任何操作
              })
            } else {
              personForm.address = res.data[0].address_parts.full_city
              personForm.address2 = res.data[0].address_parts.full_district
              personForm.road = res.data[0].address_parts.full_road_section
              personForm.road2 = res.data[0].address_parts.after_road_section
            }
          } else {
            personForm.company = ''
          }
        })
    }
  }
)

// const timeOptions = computed(() => {
//   const options = []
//   for (let i = 5; i < 20; i++) {
//     for (let j = 0; j < 60; j += 30) { // 每30分
//       const hour = i.toString().padStart(2, '0')
//       const minute = j.toString().padStart(2, '0')
//       const nextMinute = (j + 30) % 60
//       const nextHour = nextMinute === 0 ? (i + 1) % 24 : i
//       const timeRange = `${hour}:${minute}-${nextHour.toString().padStart(2, '0')}:${nextMinute.toString().padStart(2, '0')}`
//       options.push(timeRange)
//     }
//   }
//   return options
// })

// 電話號碼搜尋自動導入其他

const telOptions = ref([])
const isCompilationUserInput = ref(true)
const filterTel = async (search, update, abort) => {
  if (search.length > 3) {
    const newData = []
    let page = 1
    let totalPages = 1

    while (page <= totalPages) {
      const { data } = await apiAuth.get(`/member/member?sort=id&order=DESC&filter_phone=${search}&page=${page}`)

      // Update the total number of pages if it hasn't been set yet
      if (totalPages === 1) {
        totalPages = data.last_page
      }

      // newData.push(...data.data.map(item => `${item.name} ${item.mobile.replace('-', '')}`))
      newData.push(...data.data.map(item => item.mobile.replace('-', '')))
      page++
    }

    update(() => {
      telOptions.value.length = 0
      telOptions.value.push(...newData)
    })
  } else {
    telOptions.value.length = 0
  }
}

const selectTel = (value) => {
  // 驗證電話號碼格式
  const phoneRegex = /^[0-9]{10}$/
  if (phoneRegex.test(value.target.value)) {
    personForm.tel = value.target.value
    // 在這裡更新其他的欄位
  }
}

let timeoutId = null

watch(
  // 監聽personForm.tel的變化
  () => personForm.tel,
  (newVal, oldVal) => {
    // 如果tel為空，清空表單中的其他資料
    if (!newVal) {
      personForm.name = ''
      // personForm.email = ''
      personForm.road = ''
      personForm.address = ''
      personForm.address2 = ''
      personForm.road2 = ''
      return
    }

    if (newVal === oldVal) {
      // 用户未完成输入，不更新
      return
    }

    clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      try {
        // 延遲請求的時間（以毫秒為單位）
        const delay = 100

        // 延遲指定的時間
        await new Promise(resolve => setTimeout(resolve, delay))
        // 發送API請求獲取資料
        const { data } = await apiAuth.get(`/member/member?filter_phone=${newVal}`)

        if (data.data.length > 0) {
          // 如果找到對應的資料，填入表單中
          personForm.name = data.data[0].name
          // personForm.email = data.data[0].email
          personForm.road = data.data[0].shipping_road
          personForm.road2 = data.data[0].shipping_address1

          personForm.prefix = data.data[0].telephone_prefix
          const telephone = data.data[0].telephone // 獲取電話號碼
          const [hometel, hometel2] = telephone.split('#') // 使用 split() 方法將字符串按 "#" 分割

          personForm.hometel = hometel // 將 "#" 前面的内容赋给 personForm.hometel
          personForm.hometel2 = hometel2 // 將 "#" 后面的内容赋给 personForm.hometel2

          personForm.hometel = personForm.hometel.replace(/-/g, '')
          personForm.memberId = data.data[0].id
          personForm.compilation = data.data[0].payment_tin
          personForm.company = data.data[0].payment_company
          personForm.gender = data.data[0].salutation_id.toString()

          isCompilationUserInput.value = false

          // 導入舊資料縣市
          const stateObject = await apiAuth.get('localization/division/state')
            .then(response => response.data.find(item => item.id === data.data[0].shipping_state_id))

          personForm.address = stateObject.name
          // 導入舊資料區域
          const cities = await apiAuth.get(`localization/division/city?filter_parent_id=${stateObject.id}`)
            .then(response => response.data.find(item => item.city_id === data.data[0].shipping_city_id))

          personForm.address2 = cities.name
        } else {
          // 如果沒有找到對應的資料，不清空輸入的號碼
          return
        }
      } catch (error) {
        // 處理錯誤
        console.error(error)
      }
    }, 100)
  }
)

// 市話號碼搜尋自動導入其他

const hometelOptions = ref([])
const isCompilationUserInput2 = ref(true)
const filterHometel = async (search, update, abort) => {
  if (search.length > 7) {
    const newData = []
    let page = 1
    let totalPages = 1

    while (page <= totalPages) {
      const { data } = await
      apiAuth.get(`/member/member?sort=id&order=DESC&filter_phone=${search}&page=${page}`)
      if (totalPages === 1) { totalPages = data.last_page }

      newData.push(...data.data.map(item => item.telephone.replace('-', '')))
      page++
    }

    update(() => {
      hometelOptions.value.length = 0
      hometelOptions.value.push(...newData)
    })
  } else {
    hometelOptions.value.length = 0
  }
}

const selectHometel = (value) => {
  const phoneRegex = /^[0-9]{8}$/
  if (phoneRegex.test(value)) {
    // const [name, telephone] = value.split('_')
    const [hometel, hometel2] = value.split('#')
    // personForm.name = name.trim()
    personForm.hometel = hometel.trim()
    personForm.hometel2 = hometel2.trim()
  }
}

watch(
  // 監聽personForm.hometel的變化
  () => personForm.hometel,
  (newVal, oldVal) => {
  // 如果tel為空，清空表單中的其他資料
    if (!newVal) {
      personForm.name = ''
      // personForm.email = ''
      personForm.road = ''
      personForm.address = ''
      personForm.address2 = ''
      personForm.road2 = ''
      return
    }

    if (newVal === oldVal) {
      // 用户未完成输入，不更新
      return
    }

    clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
      try {
        // 延遲請求的時間（以毫秒為單位）
        const delay = 100

        // 延遲指定的時間
        await new Promise(resolve => setTimeout(resolve, delay))
        // 發送API請求獲取資料
        const { data } = await apiAuth.get(`/member/member?filter_phone=${newVal}`)

        if (data.data.length > 0) {
          // 如果找到對應的資料，填入表單中
          personForm.name = data.data[0].name
          // personForm.email = data.data[0].email
          personForm.road = data.data[0].shipping_road
          personForm.road2 = data.data[0].shipping_address1

          personForm.prefix = data.data[0].telephone_prefix
          personForm.tel = data.data[0].mobile.replace(/-/g, '')
          personForm.memberId = data.data[0].id
          personForm.compilation = data.data[0].payment_tin
          personForm.company = data.data[0].payment_company
          personForm.gender = data.data[0].salutation_id.toString()

          isCompilationUserInput.value = false

          // 導入舊資料縣市
          const stateObject = await apiAuth.get('localization/division/state')
            .then(response => response.data.find(item => item.id === data.data[0].shipping_state_id))

          personForm.address = stateObject.name
          // 導入舊資料區域
          const cities = await apiAuth.get(`localization/division/city?filter_parent_id=${stateObject.id}`)
            .then(response => response.data.find(item => item.city_id === data.data[0].shipping_city_id))

          personForm.address2 = cities.name
        } else {
          // 如果沒有找到對應的資料，不清空輸入的號碼
          return
        }
      } catch (error) {
        // 處理錯誤
        console.error(error)
      }
    }, 100)
  }
)

// 客戶備註
const dialogVisible2 = ref(false)
const option2s = ref([])
const getExtraComments2 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('/sale/order/getOrderPhrases/phrase_order_comment')
    const extraComments = response.data

    for (let i = 0; i < extraComments.length; i++) {
      option2s.value.push(extraComments[i].translation.name)
    }
  } catch (error) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'cloud_off',
      message: error.message
    })
  }
}

getExtraComments2()

const ITEMS_PER_PAGE2 = 10
const searchTerm2 = ref('')
const currentPage2 = ref(1)
const filteredOption2s = computed(() => {
  const start = (currentPage2.value - 1) * ITEMS_PER_PAGE2
  const end = start + ITEMS_PER_PAGE2
  return option2s.value
    .filter(option2 => option2.toLowerCase().includes(searchTerm2.value.toLowerCase()))
    .slice(start, end)
})
const totalPage2s = computed(() => Math.ceil(option2s.value.length / ITEMS_PER_PAGE2))
watch(() => personForm.remark, (newVal) => {
  if (newVal.includes('..')) {
    showDialog2()
  }
})

function showDialog2 () {
  searchTerm2.value = ''
  currentPage2.value = 1
  dialogVisible2.value = true
}
function closeDialog2 () {
  dialogVisible2.value = false
}

function selectOption2 (option2) {
  if (personForm.remark === '..') {
    personForm.remark = ''
    personForm.remark = option2
  } else {
    personForm.remark += ',' + option2
  }

  personForm.remark = personForm.remark.replace('..', '')
  closeDialog2()
}

// 餐點備註
const mealRemark = ref('')
const dialogVisible = ref(false)

const options = ref([])

const getExtraComments = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('/sale/order/getOrderPhrases/phrase_order_extra_comment')
    const extraComments = response.data

    for (let i = 0; i < extraComments.length; i++) {
      options.value.push(extraComments[i].translation.name)
    }
  } catch (error) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'cloud_off',
      message: error.message
    })
  }
}

getExtraComments()

const ITEMS_PER_PAGE = 10
const searchTerm = ref('')
const currentPage = ref(1)
const filteredOptions = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE
  return options.value
    .filter(option => option.toLowerCase().includes(searchTerm.value.toLowerCase()))
    .slice(start, end)
})
const totalPages = computed(() => Math.ceil(options.value.length / ITEMS_PER_PAGE))

watch(mealRemark, (newVal) => {
  if (newVal.includes('..')) {
    showDialog()
  }
})

function showDialog () {
  searchTerm.value = ''
  currentPage.value = 1
  dialogVisible.value = true
}

function closeDialog () {
  dialogVisible.value = false
}

function selectOption (option) {
  if (mealRemark.value === '..') {
    mealRemark.value = ''
    mealRemark.value = option
  } else {
    mealRemark.value += ',' + option
  }

  mealRemark.value = mealRemark.value.replace('..', '')
  closeDialog()
}
// 推入聯絡人
const getCustomers = async () => {
  const batchSize = 100 // 每批處理的客戶端請求數量
  const customers = []
  let currentPage = 1
  let totalPages = 1

  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const { data: { total } } = await apiAuth.get('/member/member')
    totalPages = Math.ceil(total / batchSize)

    while (currentPage <= totalPages) {
      const requests = []
      for (let i = 0; i < batchSize; i++) {
        const request = apiAuth.get(`/member/member?page=${currentPage}`)
        requests.push(request)
        currentPage++
        if (currentPage > totalPages) break
      }

      const responses = await Promise.all(requests)

      for (const response of responses) {
        customers.push(...response.data.data)
      }

      // Add a delay of 1 second between API calls
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return customers
  } catch (error) {
    console.error(error)
    throw new Error('Unable to fetch customers')
  }
}

const savePerson = async () => {
  if (!personForm.pick) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇送達方式'
    })
    return
  }
  if (!personForm.getDate) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇送達日期'
    })
    return
  }
  if (!personForm.time) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請輸入送達時間範圍'
    })
    return
  }
  if (!personForm.noCompilation) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇是否需要統編'
    })
    return
  }

  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    // 導入資料縣市
    let cities = []
    let stateId = ''
    let address2Id = ''

    if (personForm.address) {
      const states = await apiAuth.get('localization/division/state')
      const state = states.data.find(s => s.name === personForm.address)
      stateId = state ? state.id : ''
      console.log(stateId)
      personForm.address = state.name

      await new Promise(resolve => setTimeout(resolve, 100))

      if (state) {
        cities = await apiAuth.get(`localization/division/city?filter_parent_id=${state.id}`)
        const city = cities.data.find(c => c.name === personForm.address2)
        address2Id = city ? city.city_id : ''
        console.log(address2Id)
        personForm.address2 = city.name
      }
    }

    // 其他情况下填入空值
    if (!personForm.address || !stateId) {
      stateId = ''
      address2Id = ''
    }

    const customers = await getCustomers()
    const customer = customers.find(c => c.mobile.replace('-', '') === personForm.tel.replace('-', ''))

    if (personForm.prefix == null) {
      personForm.prefix = ''
    }
    if (personForm.hometel2 == null) {
      personForm.hometel2 = ''
    }
    if (personForm.hometel == null) {
      personForm.hometel = ''
    }

    if (customer) {
      // 如果已經存在客戶資料，就更新它
      // await apiAuth.put(`/member/member/${customer.id}`,
      await apiAuth.post('/member/member/save',
        {

          member_id: customer.id, // id
          telephone_prefix: personForm.prefix,
          telephone: personForm.hometel + '#' + personForm.hometel2, // 家電
          name: personForm.name, // 訂購人
          mobile: personForm.tel, // 訂購人電話
          // email: personForm.email, // 訂購人email
          shipping_personal_name: personForm.recipient, // 收件人
          shipping_phone: personForm.recipientTel, // 收件人電話
          payment_tin: personForm.compilation, // 統編
          payment_company: personForm.company, // 公司名稱
          shipping_company: personForm.getCompany, // 取貨公司
          shipping_state_id: stateId, // 縣市id
          shipping_city_id: address2Id, // 區域id
          shipping_road: personForm.road, // 路名
          shipping_address1: personForm.road2, // 地址
          salutation_id: parseInt(personForm.gender) // 稱謂
        })
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check-circle',
        message: '是老客戶,已更新資料'
      })
    } else {
      // 如果不存在客戶資料，就新增一筆新的客戶資料
      await apiAuth.post('/member/member/save', {
        member_id: '',
        name: personForm.name,
        mobile: personForm.tel,
        telephone_prefix: personForm.prefix,
        telephone: personForm.hometel + '#' + personForm.hometel2,
        // email: personForm.email,
        shipping_personal_name: personForm.recipient,
        shipping_phone: personForm.recipientTel,
        payment_tin: personForm.compilation,
        payment_company: personForm.company,
        shipping_company: personForm.getCompany,
        shipping_country_code: stateId, // 推入對應的ID
        shipping_city_id: address2Id,
        shipping_road: personForm.road,
        shipping_address1: personForm.road2,
        salutation_id: parseInt(personForm.gender), // 稱謂
        is_active: 1,
        is_admin: 0
      })
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check-circle',
        message: '是新客戶,已加入資料'
      })
    }
    showPersonDialog.value = false
    // 介面上顯示原本的地址名稱
  } catch (error) {
    console.error(error)
    await $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'An error occurred: ' + error.message
    })
  }
}

/// 任意搭配update//
// 便當
const bangdong1Arbitrarily = ref(0)
const bangdong2Arbitrarily = ref(0)
const bangdong3Arbitrarily = ref(0)
const bangdong4Arbitrarily = ref(0)
const bangdongVegetarian1Arbitrarily = ref(0)
const bangdongVegetarian2Arbitrarily = ref(0)
const bangdong1EditArbitrarily = ref(0)
const bangdong2EditArbitrarily = ref(0)
const bangdong3EditArbitrarily = ref(0)
const bangdong4EditArbitrarily = ref(0)
const bangdongVegetarian1EditArbitrarily = ref(0)
const bangdongVegetarian2EditArbitrarily = ref(0)
// 盒餐
const lunchBox1Arbitrarily = ref(0)
const lunchBox2Arbitrarily = ref(0)
const lunchBox3Arbitrarily = ref(0)
const lunchBox4Arbitrarily = ref(0)
const lunchBox1EditArbitrarily = ref(0)
const lunchBox2EditArbitrarily = ref(0)
const lunchBox3EditArbitrarily = ref(0)
const lunchBox4EditArbitrarily = ref(0)
// 客製便當
const bangdongCustom1Arbitrarily = ref(0)
const bangdongCustom1EditArbitrarily = ref(0)
// 客製盒餐
const lunchBoxCustom1Arbitrarily = ref(0)
const lunchBoxCustom1EditArbitrarily = ref(0)
// 單點
// const bangdongSoloArbitrarily = ref(0)
// const bangdongSoloEditArbitrarily = ref(0)

/// ///////////////便當盒餐/////////////////////
const loading = ref(false)
// 便當盒餐開關
const showbangdong = ref(false)

// 是否已經抓取過招牌便當資料的狀態變數
const isBangdong1Loaded = ref(false)
const isBangdong2Loaded = ref(false)
const isBangdong3Loaded = ref(false)
const isBangdong4Loaded = ref(false)
const isBangdongVegetarian1Loaded = ref(false)
const isBangdongVegetarian2Loaded = ref(false)

const openbangdong = () => {
  showbangdong.value = true
  if (!isBangdong1Loaded.value) {
    loadBangdong1()
    loadBangdong1Edit()
    isBangdong1Loaded.value = true
  }
  if (!isBangdong2Loaded.value) {
    loadBangdong2()
    loadBangdong2Edit()
    isBangdong2Loaded.value = true
  }
  if (!isBangdong3Loaded.value) {
    loadBangdong3()
    loadBangdong3Edit()
    isBangdong3Loaded.value = true
  }
  if (!isBangdong4Loaded.value) {
    loadBangdong4()
    loadBangdong4Edit()
    isBangdong4Loaded.value = true
  }
  if (!isBangdongVegetarian1Loaded.value) {
    loadBangdongVegetarian1()
    loadBangdongVegetarian1Edit()
    isBangdongVegetarian1Loaded.value = true
  }
  if (!isBangdongVegetarian2Loaded.value) {
    loadBangdongVegetarian2()
    loadBangdongVegetarian2Edit()
    isBangdongVegetarian2Loaded.value = true
  }
  // 其他邏輯...
}

// 招牌便當
const bangdong1Mains = reactive([])
const bangdong1MainName = ref('')
const bangdong1Drinks = reactive([])
const bangdong1DrinkName = ref('')
const bangdong1SideDishes = reactive([])
const bangdong1SideDishName = ref('')
const bangdong1Name = ref('')
const bangdong1Price = ref(0)
const bangdong1ProductId = ref('')
const bangdong1MainMealId = ref('')
const bangdong1DrinkId = ref('')
const bangdong1SideDishId = ref('')
// const editDialog = ref(false)
// 抓取招牌便當主餐形成input
const loadBangdong1 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1001')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong1Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong1Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 監聽主餐的數量變化
    bangdong1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong1SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })

    bangdong1Name.value = response.data.name
    bangdong1MainName.value = mainMeal.name
    bangdong1DrinkName.value = Drink.name
    bangdong1SideDishName.value = sideDish.name
    bangdong1Price.value = parseInt(response.data.price)
    bangdong1ProductId.value = response.data.id
    bangdong1MainMealId.value = mainMeal.id
    bangdong1DrinkId.value = Drink.id
    bangdong1SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdong1TotalQuantity = computed(() => {
  return bangdong1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong1Arbitrarily.value)
})

// // 計算總數量
// const bangdong1TotalQuantity = computed(() => {
//   const mainQuantity = bangdong1Mains.reduce((total, current) => {
//     return total + parseInt(current.quantity)
//   }, 0)
//   const arbitrarilyValue = parseInt(bangdong1Arbitrarily.value)

//   return mainQuantity + arbitrarilyValue
// })

// watch(bangdong1TotalQuantity, (newVal) => {
//   const mainQuantity = bangdong1Mains.reduce((total, current) => {
//     return total + parseInt(current.quantity)
//   }, 0)

//   bangdong1Arbitrarily.value = newVal - mainQuantity
// })
// 計算總價格
const bangdong1TotalQuantityPrice = computed(() => {
  let totalPrice = bangdong1TotalQuantity.value * bangdong1Price.value

  bangdong1Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong1SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 將資料推進tableRows
const submitBangdong1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 1,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdong1TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdong1TotalQuantity.value

  for (const bangdong1Main of bangdong1Mains) {
    if (bangdong1Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong1MainMealId.value,
        productTypeName: bangdong1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.Main += bangdong1Main.name + 'x' + parseInt(bangdong1Main.quantity).toString() + ' '

      const input = {
        id: bangdong1Main.id,
        name: bangdong1Main.name,
        value: parseInt(bangdong1Main.quantity)

      }
      console.log(parseInt(bangdong1Main.quantity).toString())
      row.inputs.push(input)
      bangdong1Main.quantity = 0
    }
  }
  for (const bangdong1Drink of bangdong1Drinks) {
    if (bangdong1Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong1Drink.name + 'x' + parseInt(bangdong1Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong1DrinkName.value,
        productTypeId: bangdong1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong1Drink.id,
        name: bangdong1Drink.name,
        value: parseInt(bangdong1Drink.quantity)

      }
      row.inputs.push(input)
      bangdong1Drink.quantity = 0
    }
  }

  for (const bangdong1SideDish of bangdong1SideDishes) {
    if (bangdong1SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong1SideDish.name + 'x' + parseInt(bangdong1SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong1SideDishName.value,
        productTypeId: bangdong1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong1SideDish.is_default + ' '
      const input = {
        id: bangdong1SideDish.id,
        name: bangdong1SideDish.name,
        value: parseInt(bangdong1SideDish.quantity),
        is_default: bangdong1SideDish.is_default

      }
      row.inputs.push(input)
      bangdong1SideDish.quantity = 0
    }
  }
  // 保留 招牌便當、1001、數量
  const productInput = {
    id: bangdong1ProductId.value,
    name: bangdong1Name.value,
    value: parseInt(totalQuantity),
    price: bangdong1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong1Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong1Arbitrarily.value).toString()
    const input = {
      id: 'bangdong1Arbitrarily',
      value: bangdong1Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong1Name.value + totalQuantity + '份'
  console.log(JSON.stringify(row))
  console.log(JSON.stringify(row.inputs))
  console.log(JSON.stringify(row.inputs.id))
  console.log(JSON.stringify(row.inputs.mainId))

  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdong1.value = false
  bangdong1Arbitrarily.value = 0
}

// 修改欄位導入
const bangdong1EditMains = reactive([])
const bangdong1EditDrinks = reactive([])
const bangdong1EditSideDishes = reactive([])
const bangdong1EditBentoMains = reactive([])
const loadBangdong1Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1001')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong1EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong1EditMains.push(bangdong1EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong1EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdong1EditDrinks.push(bangdong1EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong1EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdong1EditSideDishes.push(bangdong1EditSideDish)
    }
    // 修改修改欄位配菜跟著變

    bangdong1MainName.value = mainMeal.name
    bangdong1DrinkName.value = Drink.name
    bangdong1SideDishName.value = sideDish.name
    bangdong1Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

// 雞胸便當
const bangdong2Mains = reactive([])
const bangdong2MainName = ref('')
const bangdong2Drinks = reactive([])
const bangdong2DrinkName = ref('')
const bangdong2SideDishes = reactive([])
const bangdong2SideDishName = ref('')
const bangdong2BentoMains = reactive([])
const bangdong2BentoMainName = ref('')
const bangdong2Name = ref('')
const bangdong2ProductId = ref('')
const bangdong2MainMealId = ref('')
const bangdong2DrinkId = ref('')
const bangdong2SideDishId = ref('')
const bangdong2BentoMainId = ref('')
const bangdong2Price = ref(0)
// 抓取雞胸便當主餐形成input
const loadBangdong2 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1002')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong2Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong2Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong2SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdong2BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong2Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong2SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.namWe === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
          // 副主餐的數量跟著主餐的數量變化
          bangdong2BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 確保副主餐數量不會變成負數
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdong2Name.value = response.data.name
    bangdong2MainName.value = mainMeal.name
    bangdong2DrinkName.value = Drink.name
    bangdong2SideDishName.value = sideDish.name
    bangdong2BentoMainName.value = bentoMain.name
    bangdong2Price.value = parseInt(response.data.price)
    bangdong2ProductId.value = response.data.id
    bangdong2MainMealId.value = mainMeal.id
    bangdong2DrinkId.value = Drink.id
    bangdong2SideDishId.value = sideDish.id
    bangdong2BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdong2TotalQuantity = computed(() => {
  return bangdong2Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong2Arbitrarily.value)
})

// 計算總價格
const bangdong2TotalQuantityPrice = computed(() => {
  let totalPrice = bangdong2TotalQuantity.value * bangdong2Price.value
  bangdong2Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong2SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 將資料推進tableRows
const submitBangdong2 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 2,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong2TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdong2TotalQuantity.value
  // 主餐
  for (const bangdong2Main of bangdong2Mains) {
    if (bangdong2Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.Main += bangdong2Main.name + 'x' + parseInt(bangdong2Main.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong2MainMealId.value,
        productTypeName: bangdong2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong2Main.id,
        name: bangdong2Main.name,
        value: parseInt(bangdong2Main.quantity)
      }
      console.log(parseInt(bangdong2Main.quantity).toString())
      row.inputs.push(input)
      bangdong2Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong2Drink of bangdong2Drinks) {
    if (bangdong2Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong2Drink.name + 'x' + parseInt(bangdong2Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong2DrinkName.value,
        productTypeId: bangdong2DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong2Drink.id,
        name: bangdong2Drink.name,
        value: parseInt(bangdong2Drink.quantity)
      }
      row.inputs.push(input)
      bangdong2Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong2SideDish of bangdong2SideDishes) {
    if (bangdong2SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong2SideDish.name + 'x' + parseInt(bangdong2SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong2SideDishName.value,
        productTypeId: bangdong2SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong2SideDish.is_default + ' '
      const input = {
        id: bangdong2SideDish.id,
        name: bangdong2SideDish.name,
        value: parseInt(bangdong2SideDish.quantity),
        is_default: bangdong2SideDish.is_default
      }
      row.inputs.push(input)
      bangdong2SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong2BentoMain of bangdong2BentoMains) {
    if (bangdong2BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong2BentoMain.name + 'x' + parseInt(bangdong2BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdong2BentoMainName.value,
        productTypeId: bangdong2BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong2BentoMainId.value,
        name: bangdong2BentoMain.name,
        value: parseInt(bangdong2BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong2BentoMain.quantity = 0
    }
  }
  // 保留 雞胸便當、1002、數量
  const productInput = {
    id: bangdong2ProductId.value,
    name: bangdong2Name.value,
    value: parseInt(totalQuantity),
    price: bangdong2Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong2Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong2Arbitrarily.value).toString()
    const input = {
      id: 'bangdong2Arbitrarily',
      value: bangdong2Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong2Name.value + totalQuantity + '份'
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdong2.value = false
  bangdong2Arbitrarily.value = 0
}

// 修改欄位
const bangdong2EditMains = reactive([])
const bangdong2EditDrinks = reactive([])
const bangdong2EditSideDishes = reactive([])
const bangdong2EditBentoMains = reactive([])
const loadBangdong2Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1002')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong2EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong2EditMains.push(bangdong2EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong2EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdong2EditDrinks.push(bangdong2EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong2EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdong2EditSideDishes.push(bangdong2EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong2EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong2EditBentoMains.push(bangdong2EditBentoMain)
      console.log(bangdong2EditBentoMain)
    }
    bangdong2MainName.value = mainMeal.name
    bangdong2DrinkName.value = Drink.name
    bangdong2SideDishName.value = sideDish.name
    bangdong2BentoMainName.value = bentoMain.name
    bangdong2Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

// 雞腿便當
const bangdong3Mains = reactive([])
const bangdong3MainName = ref('')
const bangdong3Drinks = reactive([])
const bangdong3DrinkName = ref('')
const bangdong3SideDishes = reactive([])
const bangdong3SideDishName = ref('')
const bangdong3BentoMains = reactive([])
const bangdong3BentoMainName = ref('')
const bangdong3Name = ref('')
const bangdong3Price = ref('')
const bangdong3ProductId = ref('')
const bangdong3MainMealId = ref('')
const bangdong3DrinkId = ref('')
const bangdong3SideDishId = ref('')
const bangdong3BentoMainId = ref('')
// 抓取雞腿便當主餐形成input
const loadBangdong3 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1003')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong3Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong3Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong3SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdong3BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong3Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong3SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
          // 副主餐的數量跟著主餐的數量變化
          bangdong3BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 確保副主餐數量不會變成負數
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdong3Name.value = response.data.name
    bangdong3MainName.value = mainMeal.name
    bangdong3DrinkName.value = Drink.name
    bangdong3SideDishName.value = sideDish.name
    bangdong3BentoMainName.value = bentoMain.name
    bangdong3Price.value = parseInt(response.data.price)
    bangdong3ProductId.value = response.data.id
    bangdong3MainMealId.value = mainMeal.id
    bangdong3DrinkId.value = Drink.id
    bangdong3SideDishId.value = sideDish.id
    bangdong3BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdong3TotalQuantity = computed(() => {
  return bangdong3Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong3Arbitrarily.value)
})

// 計算總價格
const bangdong3TotalQuantityPrice = computed(() => {
  let totalPrice = bangdong3TotalQuantity.value * bangdong3Price.value
  bangdong3Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong3SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 將資料推進tableRows
const submitBangdong3 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 3,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong3TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdong3TotalQuantity.value
  // 主餐
  for (const bangdong3Main of bangdong3Mains) {
    if (bangdong3Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdong3Main.name + 'x' + parseInt(bangdong3Main.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong3MainMealId.value,
        productTypeName: bangdong3MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong3Main.id,
        name: bangdong3Main.name,
        value: parseInt(bangdong3Main.quantity)
      }
      console.log(parseInt(bangdong3Main.quantity).toString())
      row.inputs.push(input)
      bangdong3Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong3Drink of bangdong3Drinks) {
    if (bangdong3Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong3Drink.name + 'x' + parseInt(bangdong3Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong3DrinkName.value,
        productTypeId: bangdong3DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdong3Drink.name,
        value: parseInt(bangdong3Drink.quantity)
      }
      row.inputs.push(input)
      bangdong3Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong3SideDish of bangdong3SideDishes) {
    if (bangdong3SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong3SideDish.name + 'x' + parseInt(bangdong3SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong1SideDishName.value,
        productTypeId: bangdong1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong3SideDish.is_default + ' '
      const input = {
        id: bangdong3SideDish.id,
        name: bangdong3SideDish.name,
        value: parseInt(bangdong3SideDish.quantity),
        is_default: bangdong3SideDish.is_default
      }
      row.inputs.push(input)
      bangdong3SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong3BentoMain of bangdong3BentoMains) {
    if (bangdong3BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong3BentoMain.name + 'x' + parseInt(bangdong3BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdong3BentoMainName.value,
        productTypeId: bangdong3BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong3BentoMain.id,
        name: bangdong3BentoMain.name,
        value: parseInt(bangdong3BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong3BentoMain.quantity = 0
    }
  }
  // 保留 雞腿便當、1003、數量
  const productInput = {
    id: bangdong3ProductId.value,
    name: bangdong3Name.value,
    value: parseInt(totalQuantity),
    price: bangdong3Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong3Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong3Arbitrarily.value).toString()
    const input = {
      id: 'bangdong3Arbitrarily',
      value: bangdong3Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong3Name.value + totalQuantity + '份'
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdong3.value = false
  bangdong3Arbitrarily.value = 0
}

// 修改欄位
const bangdong3EditMains = reactive([])
const bangdong3EditDrinks = reactive([])
const bangdong3EditSideDishes = reactive([])
const bangdong3EditBentoMains = reactive([])
const loadBangdong3Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1003')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong3EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong3EditMains.push(bangdong3EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong3EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdong3EditDrinks.push(bangdong3EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong3EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdong3EditSideDishes.push(bangdong3EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong3EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong3EditBentoMains.push(bangdong3EditBentoMain)
      console.log(bangdong3EditBentoMain)
    }
    bangdong3MainName.value = mainMeal.name
    bangdong3DrinkName.value = Drink.name
    bangdong3SideDishName.value = sideDish.name
    bangdong3BentoMainName.value = bentoMain.name
    bangdong3Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

// 滷牛便當
const bangdong4Mains = reactive([])
const bangdong4MainName = ref('')
const bangdong4Drinks = reactive([])
const bangdong4DrinkName = ref('')
const bangdong4SideDishes = reactive([])
const bangdong4SideDishName = ref('')
const bangdong4BentoMains = reactive([])
const bangdong4BentoMainName = ref('')
const bangdong4Name = ref('')
const bangdong4ProductId = ref('')
const bangdong4Price = ref(0)
const bangdong4MainMealId = ref('')
const bangdong4DrinkId = ref('')
const bangdong4SideDishId = ref('')
const bangdong4BentoMainId = ref('')
// 抓取滷牛便當主餐形成input
const loadBangdong4 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1004')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdong4Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdong4Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdong4SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdong4BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdong4Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdong4SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
          // 副主餐的數量跟著主餐的數量變化
          bangdong4BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 確保副主餐數量不會變成負數
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdong4Name.value = response.data.name
    bangdong4MainName.value = mainMeal.name
    bangdong4DrinkName.value = Drink.name
    bangdong4SideDishName.value = sideDish.name
    bangdong4BentoMainName.value = bentoMain.name
    bangdong4Price.value = parseInt(response.data.price)
    bangdong4ProductId.value = response.data.id
    bangdong4MainMealId.value = mainMeal.id
    bangdong4DrinkId.value = Drink.id
    bangdong4SideDishId.value = sideDish.id
    bangdong4BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdong4TotalQuantity = computed(() => {
  return bangdong4Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong4Arbitrarily.value)
})

// 計算總價格
const bangdong4TotalQuantityPrice = computed(() => {
  let totalPrice = bangdong4TotalQuantity.value * bangdong4Price.value
  bangdong4Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong4SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})
// 將資料推進tableRows
const submitBangdong4 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 4,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong4TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdong4TotalQuantity.value
  // 主餐
  for (const bangdong4Main of bangdong4Mains) {
    if (bangdong4Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.Main += bangdong4Main.name + 'x' + parseInt(bangdong4Main.quantity).toString()
      const productInput = {
        productTypeId: bangdong4MainMealId.value,
        productTypeName: bangdong4MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong4Main.id,
        name: bangdong4Main.name,
        value: parseInt(bangdong4Main.quantity)
      }
      console.log(parseInt(bangdong4Main.quantity).toString())
      row.inputs.push(input)
      bangdong4Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdong4Drink of bangdong4Drinks) {
    if (bangdong4Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong4Drink.name + 'x' + parseInt(bangdong4Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong4DrinkName.value,
        productTypeId: bangdong4DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong4Drink.id,
        name: bangdong4Drink.name,
        value: parseInt(bangdong4Drink.quantity)
      }
      row.inputs.push(input)
      bangdong4Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdong4SideDish of bangdong4SideDishes) {
    if (bangdong4SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong4SideDish.name + 'x' + parseInt(bangdong4SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong4SideDishName.value,
        productTypeId: bangdong4SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong4SideDish.is_default + ' '
      const input = {
        id: bangdong4SideDish.id,
        name: bangdong4SideDish.name,
        value: parseInt(bangdong4SideDish.quantity),
        is_default: bangdong4SideDish.is_default
      }
      row.inputs.push(input)
      bangdong4SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdong4BentoMain of bangdong4BentoMains) {
    if (bangdong4BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong4BentoMain.name + 'x' + parseInt(bangdong4BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdong4BentoMainName.value,
        productTypeId: bangdong4BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdong4BentoMain.id,
        name: bangdong4BentoMain.name,
        value: parseInt(bangdong4BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdong4BentoMain.quantity = 0
    }
  }
  const productInput = {
    id: bangdong4ProductId.value,
    name: bangdong4Name.value,
    value: parseInt(totalQuantity),
    price: bangdong4Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong4Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong4Arbitrarily.value).toString()
    const input = {
      id: 'bangdong4Arbitrarily',
      value: bangdong4Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong4Name.value + totalQuantity + '份'
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdong4.value = false
  bangdong4Arbitrarily.value = 0
}

// 修改欄位
const bangdong4EditMains = reactive([])
const bangdong4EditDrinks = reactive([])
const bangdong4EditSideDishes = reactive([])
const bangdong4EditBentoMains = reactive([])
const loadBangdong4Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1004')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdong4EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong4EditMains.push(bangdong4EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdong4EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdong4EditDrinks.push(bangdong4EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdong4EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdong4EditSideDishes.push(bangdong4EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdong4EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdong4EditBentoMains.push(bangdong4EditBentoMain)
      console.log(bangdong4EditBentoMain)
    }

    bangdong4MainName.value = mainMeal.name
    bangdong4DrinkName.value = Drink.name
    bangdong4SideDishName.value = sideDish.name
    bangdong4BentoMainName.value = bentoMain.name
    bangdong4Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}
// 素食便當125
const bangdongVegetarian1Mains = reactive([])
const bangdongVegetarian1MainName = ref('')
const bangdongVegetarian1Drinks = reactive([])
const bangdongVegetarian1DrinkName = ref('')
const bangdongVegetarian1SideDishes = reactive([])
const bangdongVegetarian1SideDishName = ref('')
const bangdongVegetarian1BentoMains = reactive([])
const bangdongVegetarian1BentoMainName = ref('')
const bangdongVegetarian1Name = ref('')
const bangdongVegetarian1Price = ref('')
const bangdongVegetarian1ProductId = ref('')
const bangdongVegetarian1MainMealId = ref('')
const bangdongVegetarian1DrinkId = ref('')
const bangdongVegetarian1SideDishId = ref('')
const bangdongVegetarian1BentoMainId = ref('')
// 抓取素食便當125主餐形成input
const loadBangdongVegetarian1 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1066')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdongVegetarian1Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongVegetarian1Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongVegetarian1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongVegetarian1BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdongVegetarian1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdongVegetarian1SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
          // 副主餐的數量跟著主餐的數量變化
          bangdongVegetarian1BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 確保副主餐數量不會變成負數
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdongVegetarian1Name.value = response.data.name
    bangdongVegetarian1MainName.value = mainMeal.name
    bangdongVegetarian1DrinkName.value = Drink.name
    bangdongVegetarian1SideDishName.value = sideDish.name
    bangdongVegetarian1BentoMainName.value = bentoMain.name
    bangdongVegetarian1Price.value = parseInt(response.data.price)
    bangdongVegetarian1ProductId.value = response.data.id
    bangdongVegetarian1MainMealId.value = mainMeal.id
    bangdongVegetarian1DrinkId.value = Drink.id
    bangdongVegetarian1SideDishId.value = sideDish.id
    bangdongVegetarian1BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdongVegetarian1TotalQuantity = computed(() => {
  return bangdongVegetarian1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongVegetarian1Arbitrarily.value)
})

// 計算總價格
const bangdongVegetarian1TotalQuantityPrice = computed(() => {
  let totalPrice = bangdongVegetarian1TotalQuantity.value * bangdongVegetarian1Price.value
  bangdongVegetarian1Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdongVegetarian1SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 將資料推進tableRows
const submitBangdongVegetarian1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 11,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongVegetarian1TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdongVegetarian1TotalQuantity.value
  // 主餐
  for (const bangdongVegetarian1Main of bangdongVegetarian1Mains) {
    if (bangdongVegetarian1Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdongVegetarian1Main.name + 'x' + parseInt(bangdongVegetarian1Main.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdongVegetarian1MainMealId.value,
        productTypeName: bangdongVegetarian1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdongVegetarian1Main.id,
        name: bangdongVegetarian1Main.name,
        value: parseInt(bangdongVegetarian1Main.quantity)
      }
      console.log(parseInt(bangdongVegetarian1Main.quantity).toString())
      row.inputs.push(input)
      bangdongVegetarian1Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdongVegetarian1Drink of bangdongVegetarian1Drinks) {
    if (bangdongVegetarian1Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongVegetarian1Drink.name + 'x' + parseInt(bangdongVegetarian1Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongVegetarian1DrinkName.value,
        productTypeId: bangdongVegetarian1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdongVegetarian1Drink.name,
        value: parseInt(bangdongVegetarian1Drink.quantity)
      }
      row.inputs.push(input)
      bangdongVegetarian1Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdongVegetarian1SideDish of bangdongVegetarian1SideDishes) {
    if (bangdongVegetarian1SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdongVegetarian1SideDish.name + 'x' + parseInt(bangdongVegetarian1SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong1SideDishName.value,
        productTypeId: bangdong1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongVegetarian1SideDish.is_default + ' '
      const input = {
        id: bangdongVegetarian1SideDish.id,
        name: bangdongVegetarian1SideDish.name,
        value: parseInt(bangdongVegetarian1SideDish.quantity),
        is_default: bangdongVegetarian1SideDish.is_default
      }
      row.inputs.push(input)
      bangdongVegetarian1SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdongVegetarian1BentoMain of bangdongVegetarian1BentoMains) {
    if (bangdongVegetarian1BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongVegetarian1BentoMain.name + 'x' + parseInt(bangdongVegetarian1BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdongVegetarian1BentoMainName.value,
        productTypeId: bangdongVegetarian1BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdongVegetarian1BentoMain.id,
        name: bangdongVegetarian1BentoMain.name,
        value: parseInt(bangdongVegetarian1BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdongVegetarian1BentoMain.quantity = 0
    }
  }
  // 保留 素食便當125、1003、數量
  const productInput = {
    id: bangdongVegetarian1ProductId.value,
    name: bangdongVegetarian1Name.value,
    value: parseInt(totalQuantity),
    price: bangdongVegetarian1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongVegetarian1Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongVegetarian1Arbitrarily.value).toString()
    const input = {
      id: 'bangdongVegetarian1Arbitrarily',
      value: bangdongVegetarian1Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongVegetarian1Name.value + totalQuantity + '份'
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdongVegetarian1.value = false
  bangdongVegetarian1Arbitrarily.value = 0
}

// 修改欄位
const bangdongVegetarian1EditMains = reactive([])
const bangdongVegetarian1EditDrinks = reactive([])
const bangdongVegetarian1EditSideDishes = reactive([])
const bangdongVegetarian1EditBentoMains = reactive([])
const loadBangdongVegetarian1Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1066')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdongVegetarian1EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongVegetarian1EditMains.push(bangdongVegetarian1EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongVegetarian1EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdongVegetarian1EditDrinks.push(bangdongVegetarian1EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongVegetarian1EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdongVegetarian1EditSideDishes.push(bangdongVegetarian1EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongVegetarian1EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongVegetarian1EditBentoMains.push(bangdongVegetarian1EditBentoMain)
      console.log(bangdongVegetarian1EditBentoMain)
    }
    bangdongVegetarian1MainName.value = mainMeal.name
    bangdongVegetarian1DrinkName.value = Drink.name
    bangdongVegetarian1SideDishName.value = sideDish.name
    bangdongVegetarian1BentoMainName.value = bentoMain.name
    bangdongVegetarian1Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

// 素食便當150
const bangdongVegetarian2Mains = reactive([])
const bangdongVegetarian2MainName = ref('')
const bangdongVegetarian2Drinks = reactive([])
const bangdongVegetarian2DrinkName = ref('')
const bangdongVegetarian2SideDishes = reactive([])
const bangdongVegetarian2SideDishName = ref('')
const bangdongVegetarian2BentoMains = reactive([])
const bangdongVegetarian2BentoMainName = ref('')
const bangdongVegetarian2Name = ref('')
const bangdongVegetarian2Price = ref('')
const bangdongVegetarian2ProductId = ref('')
const bangdongVegetarian2MainMealId = ref('')
const bangdongVegetarian2DrinkId = ref('')
const bangdongVegetarian2SideDishId = ref('')
const bangdongVegetarian2BentoMainId = ref('')
// 抓取素食便當125主餐形成input
const loadBangdongVegetarian2 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1067')

    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdongVegetarian2Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongVegetarian2Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongVegetarian2SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongVegetarian2BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }
    // 監聽主餐的數量變化
    bangdongVegetarian2Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          bangdongVegetarian2SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
          // 副主餐的數量跟著主餐的數量變化
          bangdongVegetarian2BentoMains.forEach(bentoMain => {
            const diff = Number(newVal) - Number(oldVal)
            const newQuantity = Number(bentoMain.quantity) + diff

            // 確保副主餐數量不會變成負數
            bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
          })
        }
      })
    })
    bangdongVegetarian2Name.value = response.data.name
    bangdongVegetarian2MainName.value = mainMeal.name
    bangdongVegetarian2DrinkName.value = Drink.name
    bangdongVegetarian2SideDishName.value = sideDish.name
    bangdongVegetarian2BentoMainName.value = bentoMain.name
    bangdongVegetarian2Price.value = parseInt(response.data.price)
    bangdongVegetarian2ProductId.value = response.data.id
    bangdongVegetarian2MainMealId.value = mainMeal.id
    bangdongVegetarian2DrinkId.value = Drink.id
    bangdongVegetarian2SideDishId.value = sideDish.id
    bangdongVegetarian2BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdongVegetarian2TotalQuantity = computed(() => {
  return bangdongVegetarian2Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongVegetarian2Arbitrarily.value)
})

// 計算總價格
const bangdongVegetarian2TotalQuantityPrice = computed(() => {
  let totalPrice = bangdongVegetarian2TotalQuantity.value * bangdongVegetarian2Price.value
  bangdongVegetarian2Drinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdongVegetarian2SideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 將資料推進tableRows
const submitBangdongVegetarian2 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 11,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongVegetarian2TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdongVegetarian2TotalQuantity.value
  // 主餐
  for (const bangdongVegetarian2Main of bangdongVegetarian2Mains) {
    if (bangdongVegetarian2Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdongVegetarian2Main.name + 'x' + parseInt(bangdongVegetarian2Main.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdongVegetarian2MainMealId.value,
        productTypeName: bangdongVegetarian2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdongVegetarian2Main.id,
        name: bangdongVegetarian2Main.name,
        value: parseInt(bangdongVegetarian2Main.quantity)
      }
      console.log(parseInt(bangdongVegetarian2Main.quantity).toString())
      row.inputs.push(input)
      bangdongVegetarian2Main.quantity = 0
    }
  }
  // 飲料
  for (const bangdongVegetarian2Drink of bangdongVegetarian2Drinks) {
    if (bangdongVegetarian2Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongVegetarian2Drink.name + 'x' + parseInt(bangdongVegetarian2Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongVegetarian2DrinkName.value,
        productTypeId: bangdongVegetarian2DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdongVegetarian2Drink.name,
        value: parseInt(bangdongVegetarian2Drink.quantity)
      }
      row.inputs.push(input)
      bangdongVegetarian2Drink.quantity = 0
    }
  }
  // 配菜
  for (const bangdongVegetarian2SideDish of bangdongVegetarian2SideDishes) {
    if (bangdongVegetarian2SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdongVegetarian2SideDish.name + 'x' + parseInt(bangdongVegetarian2SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong1SideDishName.value,
        productTypeId: bangdong1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongVegetarian2SideDish.is_default + ' '
      const input = {
        id: bangdongVegetarian2SideDish.id,
        name: bangdongVegetarian2SideDish.name,
        value: parseInt(bangdongVegetarian2SideDish.quantity),
        is_default: bangdongVegetarian2SideDish.is_default
      }
      row.inputs.push(input)
      bangdongVegetarian2SideDish.quantity = 0
    }
  }
  // 副主餐
  for (const bangdongVegetarian2BentoMain of bangdongVegetarian2BentoMains) {
    if (bangdongVegetarian2BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongVegetarian2BentoMain.name + 'x' + parseInt(bangdongVegetarian2BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdongVegetarian2BentoMainName.value,
        productTypeId: bangdongVegetarian2BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdongVegetarian2BentoMain.id,
        name: bangdongVegetarian2BentoMain.name,
        value: parseInt(bangdongVegetarian2BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdongVegetarian2BentoMain.quantity = 0
    }
  }
  // 保留 素食便當125、1003、數量
  const productInput = {
    id: bangdongVegetarian2ProductId.value,
    name: bangdongVegetarian2Name.value,
    value: parseInt(totalQuantity),
    price: bangdongVegetarian2Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongVegetarian2Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongVegetarian2Arbitrarily.value).toString()
    const input = {
      id: 'bangdongVegetarian2Arbitrarily',
      value: bangdongVegetarian2Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongVegetarian2Name.value + totalQuantity + '份'
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdongVegetarian2.value = false
  bangdongVegetarian2Arbitrarily.value = 0
}

// 修改欄位
const bangdongVegetarian2EditMains = reactive([])
const bangdongVegetarian2EditDrinks = reactive([])
const bangdongVegetarian2EditSideDishes = reactive([])
const bangdongVegetarian2EditBentoMains = reactive([])
const loadBangdongVegetarian2Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1067')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdongVegetarian2EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongVegetarian2EditMains.push(bangdongVegetarian2EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongVegetarian2EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0,
        price: DrinkValue.price
      }
      bangdongVegetarian2EditDrinks.push(bangdongVegetarian2EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongVegetarian2EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      }
      bangdongVegetarian2EditSideDishes.push(bangdongVegetarian2EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongVegetarian2EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongVegetarian2EditBentoMains.push(bangdongVegetarian2EditBentoMain)
      console.log(bangdongVegetarian2EditBentoMain)
    }
    bangdongVegetarian2MainName.value = mainMeal.name
    bangdongVegetarian2DrinkName.value = Drink.name
    bangdongVegetarian2SideDishName.value = sideDish.name
    bangdongVegetarian2BentoMainName.value = bentoMain.name
    bangdongVegetarian2Price.value = parseInt(response.data.price)
  } catch (error) {
    console.error(error)
  }
}

// ---------------------------------------------------------
// 經濟盒餐
const lunchBox1Mains = reactive([])
const lunchBox1SideDishes = reactive([])
const lunchBox1SideDishName = ref('')
const lunchBox1DrinkName = ref('')
const lunchBox1MainName = ref('')
const lunchBox1Name = ref('')
const lunchBox1Price = ref(0)
const lunchBox1ProductId = ref('')
const lunchBox1MainMealId = ref('')
const lunchBox1DrinkId = ref('')
const lunchBox1SideDishId = ref('')
const loadLunchBox1 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1005')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox1Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 監聽主餐的數量變化
    lunchBox1Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox1SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })
    lunchBox1Name.value = response.data.name
    lunchBox1MainName.value = mainMeal.name
    lunchBox1DrinkName.value = drink.name
    lunchBox1SideDishName.value = sideDish.name
    lunchBox1Price.value = parseInt(response.data.price)
    lunchBox1ProductId.value = response.data.id
    lunchBox1MainMealId.value = mainMeal.id
    lunchBox1DrinkId.value = drink.id
    lunchBox1SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const lunchBox1TotalQuantity = computed(() => {
  return lunchBox1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox1Arbitrarily.value)
})

// 計算總價格
const lunchBox1TotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox1TotalQuantity.value * lunchBox1Price.value
  lunchBox1SideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

const submitLunchbox1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 5,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox1TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalQuantity = lunchBox1TotalQuantity.value
  for (const option of lunchBox1Mains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox1DrinkName.value,
            productTypeId: lunchBox1DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox1MainMealId.value,
        productTypeName: lunchBox1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  // 推進配菜
  for (const sideDish of lunchBox1SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox1SideDishName.value,
        productTypeId: lunchBox1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 經濟盒餐、1005、數量
  const productInput = {
    id: lunchBox1ProductId.value,
    name: lunchBox1Name.value,
    value: parseInt(totalQuantity),
    price: lunchBox1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)

  // 保留任搭數量
  if (lunchBox1Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox1Arbitrarily.value).toString()
    const input = {
      id: 'lunchBox1Arbitrarily',
      value: lunchBox1Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox1Name.value + totalQuantity + '份'
  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
    showlunchBox1.value = false
    lunchBox1Arbitrarily.value = 0
  }
}

// editDialog5導入欄位
const lunchBox1EditMains = reactive([])
const lunchBox1EditSideDishes = reactive([])
const lunchBox1EditSideDishName = ref('')
const lunchBox1EditDrinkName = ref('')
const lunchBox1EditMainName = ref('')
const lunchBox1EditName = ref('')

const loadLunchBox1Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1005')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox1EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox1EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    lunchBox1EditName.value = response.data.name
    lunchBox1EditMainName.value = mainMeal.name
    lunchBox1EditDrinkName.value = drink.name
    lunchBox1EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}

// 會議盒餐
const lunchBox2Mains = reactive([])
const lunchBox2SideDishes = reactive([])
const lunchBox2SideDishName = ref('')
const lunchBox2DrinkName = ref('')
const lunchBox2MainName = ref('')
const lunchBox2Name = ref('')
const lunchBox2Price = ref(0)
const lunchBox2MainMealId = ref('')
const lunchBox2ProductId = ref('')
const lunchBox2DrinkId = ref('')
const lunchBox2SideDishId = ref('')

const loadLunchBox2 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1006')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox2Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox2SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 監聽主餐的數量變化
    lunchBox2Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox2SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })
    lunchBox2Name.value = response.data.name
    lunchBox2MainName.value = mainMeal.name
    lunchBox2DrinkName.value = drink.name
    lunchBox2SideDishName.value = sideDish.name
    lunchBox2Price.value = parseInt(response.data.price)
    lunchBox2MainMealId.value = mainMeal.id
    lunchBox2ProductId.value = response.data.id
    lunchBox2DrinkId.value = drink.id
    lunchBox2SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const lunchBox2TotalQuantity = computed(() => {
  return lunchBox2Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox2Arbitrarily.value)
})

// 計算總價格
const lunchBox2TotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox2TotalQuantity.value * lunchBox2Price.value
  lunchBox2SideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

const submitLunchbox2 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 6,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox2TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalQuantity = lunchBox2TotalQuantity.value
  for (const option of lunchBox2Mains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox2DrinkName.value,
            productTypeId: lunchBox2DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }
      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox2MainMealId.value,
        productTypeName: lunchBox2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  // 推進配菜
  for (const sideDish of lunchBox2SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox2SideDishName.value,
        productTypeId: lunchBox2SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 會議盒餐、1005、數量
  const productInput = {
    id: lunchBox2ProductId.value,
    name: lunchBox2Name.value,
    value: parseInt(totalQuantity),
    price: lunchBox2Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox2Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox2Arbitrarily.value).toString()
    const input = {
      id: 'lunchBox2Arbitrarily',
      value: lunchBox2Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox2Name.value + totalQuantity + '份'
  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
    showlunchBox2.value = false
    lunchBox2Arbitrarily.value = 0
  }
}
// editDialog6導入欄位
const lunchBox2EditMains = reactive([])
const lunchBox2EditSideDishes = reactive([])
const lunchBox2EditSideDishName = ref('')
const lunchBox2EditDrinkName = ref('')
const lunchBox2EditMainName = ref('')
const lunchBox2EditName = ref('')

const loadLunchBox2Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1006')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox2EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox2EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // // 監聽主餐的數量變化
    // lunchBox2EditMains.forEach(main => {
    //   watch(() => main.quantity, (newVal, oldVal) => {
    //     if (newVal !== oldVal) {
    //       // 配菜的數量跟著主餐的數量變化
    //       lunchBox2EditSideDishes.forEach(sideDish => {
    //         if (sideDish.is_default) {
    //           const diff = Number(newVal) - Number(oldVal)
    //           if (newVal === 0) {
    //             sideDish.quantity = 0
    //           } else {
    //             sideDish.quantity = Number(sideDish.quantity) + diff
    //           }
    //         }
    //       })
    //     }
    //   })
    // })
    lunchBox2EditName.value = response.data.name
    lunchBox2EditMainName.value = mainMeal.name
    lunchBox2EditDrinkName.value = drink.name
    lunchBox2EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}

// 貴賓盒餐
const lunchBox3Mains = reactive([])
const lunchBox3SideDishes = reactive([])
const lunchBox3SideDishName = ref('')
const lunchBox3DrinkName = ref('')
const lunchBox3MainName = ref('')
const lunchBox3Name = ref('')
const lunchBox3Price = ref(0)
const lunchBox3ProductId = ref('')
const lunchBox3MainMealId = ref('')
const lunchBox3DrinkId = ref('')
const lunchBox3SideDishId = ref('')

const loadLunchBox3 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1007')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox3Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox3SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 監聽主餐的數量變化
    lunchBox3Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox3SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })
    lunchBox3Name.value = response.data.name
    lunchBox3MainName.value = mainMeal.name
    lunchBox3DrinkName.value = drink.name
    lunchBox3SideDishName.value = sideDish.name
    lunchBox3Price.value = parseInt(response.data.price)
    lunchBox3ProductId.value = response.data.id
    lunchBox3MainMealId.value = mainMeal.id
    lunchBox3DrinkId.value = drink.id
    lunchBox3SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const lunchBox3TotalQuantity = computed(() => {
  return lunchBox3Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox3Arbitrarily.value)
})

// 計算總價格
const lunchBox3TotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox3TotalQuantity.value * lunchBox3Price.value
  lunchBox3SideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

const submitLunchbox3 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 7,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox3TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalQuantity = lunchBox3TotalQuantity.value
  for (const option of lunchBox3Mains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox3DrinkName.value,
            productTypeId: lunchBox3DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox3MainMealId.value,
        productTypeName: lunchBox3MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  // 推進配菜
  for (const sideDish of lunchBox3SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox3SideDishName.value,
        productTypeId: lunchBox3SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 貴賓盒餐、1007、數量
  const productInput = {
    id: lunchBox3ProductId.value,
    name: lunchBox3Name.value,
    value: parseInt(totalQuantity),
    price: lunchBox3Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox3Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox3Arbitrarily.value).toString()
    const input = {
      id: 'lunchBox3Arbitrarily',
      value: lunchBox3Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox3Name.value + totalQuantity + '份'
  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
    showlunchBox3.value = false
    lunchBox3Arbitrarily.value = 0
  }
}
// editDialog7導入欄位
const lunchBox3EditMains = reactive([])
const lunchBox3EditSideDishes = reactive([])
const lunchBox3EditSideDishName = ref('')
const lunchBox3EditDrinkName = ref('')
const lunchBox3EditMainName = ref('')
const lunchBox3EditName = ref('')

const loadLunchBox3Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1007')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox3EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox3EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    lunchBox3EditName.value = response.data.name
    lunchBox3EditMainName.value = mainMeal.name
    lunchBox3EditDrinkName.value = drink.name
    lunchBox3EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}

// 首席盒餐
const lunchBox4Mains = reactive([])
const lunchBox4SideDishes = reactive([])
const lunchBox4SideDishName = ref('')
const lunchBox4DrinkName = ref('')
const lunchBox4MainName = ref('')
const lunchBox4Name = ref('')
const lunchBox4Price = ref(0)
const lunchBox4ProductId = ref('')
const lunchBox4MainMealId = ref('')
const lunchBox4DrinkId = ref('')
const lunchBox4SideDishId = ref('')

const loadLunchBox4 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1008')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox4Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox4SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    // 監聽主餐的數量變化
    lunchBox4Mains.forEach(main => {
      watch(() => main.quantity, (newVal, oldVal) => {
        if (newVal !== oldVal) {
          // 配菜的數量跟著主餐的數量變化
          lunchBox4SideDishes.forEach(sideDish => {
            const diff = Number(newVal) - Number(oldVal)
            if (main.name === '123' || main.name === '123') {
              if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
                if (newVal === 0) {
                  sideDish.quantity = 0
                } else {
                  sideDish.quantity = Number(sideDish.quantity) + diff
                }
              }
            } else if (sideDish.is_default) {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          })
        }
      })
    })
    lunchBox4Name.value = response.data.name
    lunchBox4MainName.value = mainMeal.name
    lunchBox4DrinkName.value = drink.name
    lunchBox4SideDishName.value = sideDish.name
    lunchBox4Price.value = parseInt(response.data.price)
    lunchBox4ProductId.value = response.data.id
    lunchBox4MainMealId.value = mainMeal.id
    lunchBox4DrinkId.value = drink.id
    lunchBox4SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const lunchBox4TotalQuantity = computed(() => {
  return lunchBox4Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox4Arbitrarily.value)
})

// 計算總價格
const lunchBox4TotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox4TotalQuantity.value * lunchBox4Price.value
  lunchBox4SideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

const submitLunchbox4 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 8,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox4TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalQuantity = lunchBox4TotalQuantity.value
  for (const option of lunchBox4Mains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox4DrinkName.value,
            productTypeId: lunchBox4DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox4MainMealId.value,
        productTypeName: lunchBox4MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  // 推進配菜
  for (const sideDish of lunchBox4SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox4SideDishName.value,
        productTypeId: lunchBox4SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 首席盒餐、1008、數量
  const productInput = {
    id: lunchBox4ProductId.value,
    name: lunchBox4Name.value,
    value: parseInt(totalQuantity),
    price: lunchBox4Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox4Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox4Arbitrarily.value).toString()
    const input = {
      id: 'lunchBox4Arbitrarily',
      value: lunchBox4Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox4Name.value + totalQuantity + '份'
  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
    showlunchBox4.value = false
    lunchBox4Arbitrarily.value = 0
  }
}
// editDialog8導入欄位
const lunchBox4EditMains = reactive([])
const lunchBox4EditSideDishes = reactive([])
const lunchBox4EditSideDishName = ref('')
const lunchBox4EditDrinkName = ref('')
const lunchBox4EditMainName = ref('')
const lunchBox4EditName = ref('')

const loadLunchBox4Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1008')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBox4EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBox4EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default,
        price: sideDishValue.price
      })
    }
    lunchBox4EditName.value = response.data.name
    lunchBox4EditMainName.value = mainMeal.name
    lunchBox4EditDrinkName.value = drink.name
    lunchBox4EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}

// ------------------------客製便當、盒餐、單點---------------------------------
// 客製便當
const bangdongCustom1Mains = reactive([])
const bangdongCustom1MainName = ref('')
const bangdongCustom1Drinks = reactive([])
const bangdongCustom1DrinkName = ref('')
const bangdongCustom1SideDishes = reactive([])
const bangdongCustom1SideDishName = ref('')
const bangdongCustom1Name = ref('')
const bangdongCustom1BentoMains = reactive([])
const bangdongCustom1BentoMainName = ref('')
const bangdongCustom1Price = ref(0)
const bangdongCustom1ProductId = ref('')
const bangdongCustom1MainMealId = ref('')
const bangdongCustom1DrinkId = ref('')
const bangdongCustom1SideDishId = ref('')
const bangdongCustom1BentoMainId = ref('')
const editDialog9 = ref(false)
// 抓取客製便當主餐形成input
const loadBangdongCustom1 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1043')
    const productOptions = response.data.product_options
    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    for (const mainMealValue of mainMealValues) {
      bangdongCustom1Mains.push({
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongCustom1Drinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongCustom1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongCustom1BentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0
      })
    }

    bangdongCustom1Name.value = response.data.name
    bangdongCustom1MainName.value = mainMeal.name
    bangdongCustom1DrinkName.value = Drink.name
    bangdongCustom1SideDishName.value = sideDish.name
    bangdongCustom1BentoMainName.value = bentoMain.name
    bangdongCustom1ProductId.value = response.data.id
    bangdongCustom1MainMealId.value = mainMeal.id
    bangdongCustom1DrinkId.value = Drink.id
    bangdongCustom1SideDishId.value = sideDish.id
    bangdongCustom1BentoMainId.value = bentoMain.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdongCustom1TotalQuantity = computed(() => {
  return bangdongCustom1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongCustom1Arbitrarily.value)
})

// 計算總價格
const bangdongCustom1TotalQuantityPrice = computed(() => {
  return bangdongCustom1TotalQuantity.value * bangdongCustom1Price.value
})
// 將資料推進tableRows
const submitBangdongCustom1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 9,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdongCustom1TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdongCustom1TotalQuantity.value

  for (const bangdongCustom1Main of bangdongCustom1Mains) {
    if (bangdongCustom1Main.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += bangdongCustom1Main.name + 'x' + parseInt(bangdongCustom1Main.quantity).toString()
      const productInput = {
        productTypeId: bangdongCustom1MainMealId.value,
        productTypeName: bangdongCustom1MainName.value
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdongCustom1Main.name,
        value: parseInt(bangdongCustom1Main.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1Main.quantity = 0
    }
  }
  for (const bangdongCustom1Drink of bangdongCustom1Drinks) {
    if (bangdongCustom1Drink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ', '
      }
      row.drinks += bangdongCustom1Drink.name + 'x' + parseInt(bangdongCustom1Drink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongCustom1DrinkName.value,
        productTypeId: bangdongCustom1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongCustom1Drink.id,
        name: bangdongCustom1Drink.name,
        value: parseInt(bangdongCustom1Drink.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1Drink.quantity = 0
    }
  }

  for (const bangdongCustom1SideDish of bangdongCustom1SideDishes) {
    if (bangdongCustom1SideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += bangdongCustom1SideDish.name + 'x' + parseInt(bangdongCustom1SideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdongCustom1SideDishName.value,
        productTypeId: bangdongCustom1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongCustom1SideDish.is_default + ' '

      const input = {
        id: bangdongCustom1SideDish.id,
        name: bangdongCustom1SideDish.name,
        value: parseInt(bangdongCustom1SideDish.quantity),
        is_default: bangdongCustom1SideDish.is_default
      }
      row.inputs.push(input)
      bangdongCustom1SideDish.quantity = 0
    }
  }

  // 副主餐
  for (const bangdongCustom1BentoMain of bangdongCustom1BentoMains) {
    if (bangdongCustom1BentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongCustom1BentoMain.name + 'x' + parseInt(bangdongCustom1BentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdongCustom1BentoMainName.value,
        productTypeId: bangdongCustom1BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)

      const input = {
        id: bangdongCustom1BentoMain.id,
        name: bangdongCustom1BentoMain.name,
        value: parseInt(bangdongCustom1BentoMain.quantity)
      }
      row.inputs.push(input)
      bangdongCustom1BentoMain.quantity = 0
    }
  }
  const productInput = {
    id: bangdongCustom1ProductId.value,
    name: bangdongCustom1Name.value,
    value: parseInt(totalQuantity),
    price: bangdongCustom1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongCustom1Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongCustom1Arbitrarily.value).toString()
    const input = {
      id: 'bangdongCustom1Arbitrarily',
      value: bangdongCustom1Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongCustom1Name.value + totalQuantity + '份'
  bangdongCustom1Price.value = 0
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdongCustom1.value = false
  bangdongCustom1Arbitrarily.value = 0
}

// editDialog9導入欄位
const bangdongCustom1EditMains = reactive([])
const bangdongCustom1EditDrinks = reactive([])
const bangdongCustom1EditSideDishes = reactive([])
const bangdongCustom1EditBentoMains = reactive([])
const loadBangdongCustom1Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1043')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const values = mainMeal.product_option_values

    for (const value of values) {
      const bangdongCustom1EditMain = {
        id: value.id,
        name: value.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditMains.push(bangdongCustom1EditMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongCustom1EditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditDrinks.push(bangdongCustom1EditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongCustom1EditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdongCustom1EditSideDishes.push(bangdongCustom1EditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongCustom1EditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongCustom1EditBentoMains.push(bangdongCustom1EditBentoMain)
      console.log(bangdongCustom1EditBentoMain)
    }

    bangdongCustom1MainName.value = mainMeal.name
    bangdongCustom1DrinkName.value = Drink.name
    bangdongCustom1SideDishName.value = sideDish.name
    bangdongCustom1BentoMainName.value = bentoMain.name
  } catch (error) {
    console.error(error)
  }
}

// 客製盒餐
const lunchBoxCustom1Mains = reactive([])
const lunchBoxCustom1SideDishes = reactive([])
const lunchBoxCustom1SideDishName = ref('')
const lunchBoxCustom1DrinkName = ref('')
const lunchBoxCustom1MainName = ref('')
const lunchBoxCustom1Name = ref('')
const lunchBoxCustom1Price = ref(0)
const lunchBoxCustom1ProductId = ref('')
const lunchBoxCustom1MainMealId = ref('')
const lunchBoxCustom1DrinkId = ref('')
const lunchBoxCustom1SideDishId = ref('')
const loadLunchBoxCustom1 = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1044')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBoxCustom1Mains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBoxCustom1SideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    lunchBoxCustom1Name.value = response.data.name
    lunchBoxCustom1MainName.value = mainMeal.name
    lunchBoxCustom1DrinkName.value = drink.name
    lunchBoxCustom1SideDishName.value = sideDish.name
    lunchBoxCustom1ProductId.value = response.data.id
    lunchBoxCustom1MainMealId.value = mainMeal.id
    lunchBoxCustom1DrinkId.value = drink.id
    lunchBoxCustom1SideDishId.value = sideDish.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const lunchBoxCustom1TotalQuantity = computed(() => {
  return lunchBoxCustom1Mains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBoxCustom1Arbitrarily.value)
})
// 計算總價格
const lunchBoxCustom1TotalQuantityPrice = computed(() => {
  return lunchBoxCustom1TotalQuantity.value * lunchBoxCustom1Price.value
})

const submitLunchboxCustom1 = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1
  const row = {
    bentoType: 0,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBoxCustom1TotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalQuantity = lunchBoxCustom1TotalQuantity.value
  for (const option of lunchBoxCustom1Mains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBoxCustom1DrinkName.value,
            productTypeId: lunchBoxCustom1DrinkId.value,
            productType: 'options_with_qty'
          }
          row.inputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBoxCustom1MainMealId.value,
        productTypeName: lunchBoxCustom1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
      showLunchBoxCustom1.value = false
    }
  }

  // 推進配菜
  for (const sideDish of lunchBoxCustom1SideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBoxCustom1SideDishName.value,
        productTypeId: lunchBoxCustom1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 客製盒餐、數量、
  const productInput = {
    id: lunchBoxCustom1ProductId.value,
    name: lunchBoxCustom1Name.value,
    value: parseInt(totalQuantity),
    price: lunchBoxCustom1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBoxCustom1Arbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBoxCustom1Arbitrarily.value).toString()
    const input = {
      id: 'lunchBoxCustom1Arbitrarily',
      value: lunchBoxCustom1Arbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBoxCustom1Name.value + totalQuantity + '份'
  if (row.Main !== '' || row.sideDishes !== '') {
    // 如果 row.Main 或 row.sideDishes 不是空的，則添加到 tableRows
    tableRows.push(row)
    showLunchBoxCustom1.value = false
    lunchBoxCustom1Arbitrarily.value = 0
  }
}
// editDialog0導入欄位
const lunchBoxCustom1EditMains = reactive([])
const lunchBoxCustom1EditSideDishes = reactive([])
const lunchBoxCustom1EditSideDishName = ref('')
const lunchBoxCustom1EditDrinkName = ref('')
const lunchBoxCustom1EditMainName = ref('')
const lunchBoxCustom1EditName = ref('')

const loadLunchBoxCustom1Edit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1044')
    const productOptions = response.data.product_options

    // 主餐
    const mainMeal = productOptions.main_meal
    const mainMealValues = mainMeal.product_option_values

    // 飲料
    const drink = productOptions.drink
    const drinkValues = drink.product_option_values

    for (const mainMealValue of mainMealValues) {
      const main = {
        id: mainMealValue.id,
        name: mainMealValue.name,
        quantity: 0
      }

      main.drinks = drinkValues.map(drinkValue => ({
        id: drinkValue.id,
        name: drinkValue.name,
        quantity: 0
      }))

      lunchBoxCustom1EditMains.push(main)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      lunchBoxCustom1EditSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    lunchBoxCustom1EditName.value = response.data.name
    lunchBoxCustom1EditMainName.value = mainMeal.name
    lunchBoxCustom1EditDrinkName.value = drink.name
    lunchBoxCustom1EditSideDishName.value = sideDish.name
  } catch (error) {
    console.error(error)
  }
}

// 單點
const bangdongSolo6inchs = reactive([])
const bangdongSolo6inchName = ref('')
const bangdongSolo3inchs = reactive([])
const bangdongSolo3inchName = ref('')
const bangdongSoloDrinks = reactive([])
const bangdongSoloDrinkName = ref('')
const bangdongSoloSideDishes = reactive([])
const bangdongSoloSideDishName = ref('')
const bangdongSoloBentoMains = reactive([])
const bangdongSoloBentoMainName = ref('')
const bangdongSoloEcoBags = reactive([])
const bangdongSoloEcoBagName = ref('')
const bangdongSoloName = ref('')
const bangdongSoloProductId = ref('')
const bangdongSolo6inchId = ref('')
const bangdongSolo3inchId = ref('')
const bangdongSoloDrinkId = ref('')
const bangdongSoloSideDishId = ref('')
const bangdongSoloBentoMainId = ref('')
const bangdongSoloEcoBagId = ref('')
const editDialog10 = ref(false)
// 抓取單點商品形成input
const loadBangdongSolo = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1062')
    const productOptions = response.data.product_options
    // 6吋
    const burrito6inch = productOptions.burrito_6inch
    const burrito6inchValues = burrito6inch.product_option_values

    for (const burrito6inchValue of burrito6inchValues) {
      bangdongSolo6inchs.push({
        id: burrito6inchValue.id,
        name: burrito6inchValue.name,
        price: burrito6inchValue.price,
        quantity: 0
      })
    }
    // 吋
    const burrito3inch = productOptions.burrito_3inch
    const burrito3inchValues = burrito3inch.product_option_values

    for (const burrito3inchValue of burrito3inchValues) {
      bangdongSolo3inchs.push({
        id: burrito3inchValue.id,
        name: burrito3inchValue.name,
        price: burrito3inchValue.price,
        quantity: 0
      })
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values

    for (const DrinkValue of DrinkValues) {
      bangdongSoloDrinks.push({
        id: DrinkValue.id,
        name: DrinkValue.name,
        price: DrinkValue.price,
        quantity: 0
      })
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values

    for (const sideDishValue of sideDishValues) {
      bangdongSoloSideDishes.push({
        id: sideDishValue.id,
        name: sideDishValue.name,
        price: sideDishValue.price,
        quantity: 0,
        is_default: sideDishValue.is_default
      })
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      bangdongSoloBentoMains.push({
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        price: bentoMainValue.price,
        quantity: 0
      })
    }
    // 環保袋
    const ecoBag = productOptions.eco_bag
    const ecoBagValues = ecoBag.product_option_values
    for (const ecoBagValue of ecoBagValues) {
      bangdongSoloEcoBags.push({
        id: ecoBagValue.id,
        name: ecoBagValue.name,
        price: ecoBagValue.price,
        quantity: 0
      })
    }
    bangdongSoloName.value = response.data.name
    bangdongSolo6inchName.value = burrito6inch.name
    bangdongSolo3inchName.value = burrito3inch.name
    bangdongSoloDrinkName.value = Drink.name
    bangdongSoloSideDishName.value = sideDish.name
    bangdongSoloBentoMainName.value = bentoMain.name
    bangdongSoloEcoBagName.value = ecoBag.name
    bangdongSoloProductId.value = response.data.id
    bangdongSolo6inchId.value = burrito6inch.id
    bangdongSolo3inchId.value = burrito3inch.id
    bangdongSoloDrinkId.value = Drink.id
    bangdongSoloSideDishId.value = sideDish.id
    bangdongSoloBentoMainId.value = bentoMain.id
    bangdongSoloEcoBagId.value = ecoBag.id
  } catch (error) {
    console.error(error)
  }
}

// 計算總數量
const bangdongSoloTotalQuantity = computed(() => {
  let total = 0
  total += bangdongSolo6inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSolo3inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloDrinks.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloSideDishes.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloBentoMains.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEcoBags.reduce((sum, item) => sum + Number(item.quantity), 0)

  return total
})
// 計算總價格
const bangdongSoloTotalQuantityPrice = computed(() => {
  let total = 0
  total += bangdongSolo6inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSolo3inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloDrinks.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloSideDishes.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloBentoMains.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEcoBags.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)

  return total
})
// 將資料推進tableRows
const submitBangdongSolo = () => {
  const nextId = tableRows.length > 0 ? tableRows[tableRows.length - 1].id + 1 : 1

  const row = {
    bentoType: 10,
    id: nextId,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongSoloTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdongSoloTotalQuantity.value
  // 6吋潤餅
  const bangdongSolo6inchCompositions = []
  for (const bangdongSolo6inch of bangdongSolo6inchs) {
    if (bangdongSolo6inch.quantity > 0) {
      const bangdongSolo6inchComposition = `${bangdongSolo6inch.name} x${bangdongSolo6inch.quantity}`
      bangdongSolo6inchCompositions.push(bangdongSolo6inchComposition)
      // 保留6吋潤餅名稱、ID
      const productInput = {
        productTypeName: bangdongSolo6inchName.value,
        productTypeId: bangdongSolo6inchId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSolo6inch.id,
        name: bangdongSolo6inch.name,
        value: parseInt(bangdongSolo6inch.quantity)
      }
      row.inputs.push(input)

      bangdongSolo6inch.quantity = 0
    }
  }
  // 3吋潤餅
  const bangdongSolo3inchCompositions = []
  for (const bangdongSolo3inch of bangdongSolo3inchs) {
    if (bangdongSolo3inch.quantity > 0) {
      const bangdongSolo3inchComposition = `${bangdongSolo3inch.name} x${bangdongSolo3inch.quantity}`
      bangdongSolo3inchCompositions.push(bangdongSolo3inchComposition)

      // 保留3吋潤餅名稱、ID
      const productInput = {
        productTypeName: bangdongSolo3inchName.value,
        productTypeId: bangdongSolo3inchId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSolo3inch.id,
        name: bangdongSolo3inch.name,
        value: parseInt(bangdongSolo3inch.quantity)
      }
      row.inputs.push(input)

      bangdongSolo3inch.quantity = 0
    }
  }

  if (bangdongSolo6inchCompositions.length > 0) {
    row.Main += `${bangdongSolo6inchName.value}  (${bangdongSolo6inchCompositions.join(', ')})`
  }

  if (bangdongSolo3inchCompositions.length > 0) {
    if (bangdongSolo6inchCompositions.length > 0) {
      row.Main += ', '
    }
    row.Main += `${bangdongSolo3inchName.value}  (${bangdongSolo3inchCompositions.join(', ')})`
  }

  // 飲料
  for (const bangdongSoloDrink of bangdongSoloDrinks) {
    if (bangdongSoloDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongSoloDrink.name + 'x' + parseInt(bangdongSoloDrink.quantity).toString()
      // 保留飲料名稱、ID
      const productInput = {
        productTypeName: bangdongSoloDrinkName.value,
        productTypeId: bangdongSoloDrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloDrink.id,
        name: bangdongSoloDrink.name,
        price: bangdongSoloDrink.price,
        value: parseInt(bangdongSoloDrink.quantity)
      }
      row.inputs.push(input)
      bangdongSoloDrink.quantity = 0
    }
  }
  // 配菜
  const bangdongSoloSideDishCompositions = []
  for (const bangdongSoloSideDish of bangdongSoloSideDishes) {
    if (bangdongSoloSideDish.quantity > 0) {
      const bangdongSoloSideDishComposition = `${bangdongSoloSideDish.name} x${bangdongSoloSideDish.quantity}`
      bangdongSoloSideDishCompositions.push(bangdongSoloSideDishComposition)
      // console.log(bangdongSoloSideDishComposition)
      // 保留配菜名稱、ID
      const productInput = {
        productTypeName: bangdongSoloSideDishName.value,
        productTypeId: bangdongSoloSideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloSideDish.id,
        name: bangdongSoloSideDish.name,
        price: bangdongSoloSideDish.price,
        value: parseInt(bangdongSoloSideDish.quantity),
        is_default: bangdongSoloSideDish.is_default
      }
      row.inputs.push(input)

      bangdongSoloSideDish.quantity = 0
    }
  }
  // 副主餐
  const bangdongSoloBentoMainCompositions = []
  for (const bangdongSoloBentoMain of bangdongSoloBentoMains) {
    if (bangdongSoloBentoMain.quantity > 0) {
      const bangdongSoloBentoMainComposition = `${bangdongSoloBentoMain.name} x${bangdongSoloBentoMain.quantity}`
      bangdongSoloBentoMainCompositions.push(bangdongSoloBentoMainComposition)
      // console.log(bangdongSoloBentoMainComposition)
      // 保留副主餐名稱、ID
      const productInput = {
        productTypeName: bangdongSoloBentoMainName.value,
        productTypeId: bangdongSoloBentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloBentoMain.id,
        name: bangdongSoloBentoMain.name,
        price: bangdongSoloBentoMain.price,
        value: parseInt(bangdongSoloBentoMain.quantity)
      }
      row.inputs.push(input)

      bangdongSoloBentoMain.quantity = 0
    }
  }

  if (bangdongSoloSideDishCompositions.length > 0) {
    row.sideDishes += `配菜 (${bangdongSoloSideDishCompositions.join(', ')})`
  }

  if (bangdongSoloBentoMainCompositions.length > 0) {
    if (bangdongSoloSideDishCompositions.length > 0) {
      row.sideDishes += ', '
    }
    row.sideDishes += `副主餐 (${bangdongSoloBentoMainCompositions.join(', ')})`
  }
  row.name = bangdongSoloName.value + totalQuantity + '份'

  // 購物袋
  const ecoBagCompositions = []
  for (const bangdongSoloEcoBag of bangdongSoloEcoBags) {
    if (bangdongSoloEcoBag.quantity > 0) {
      const ecoBagComposition = `${bangdongSoloEcoBag.name} x${bangdongSoloEcoBag.quantity}`
      ecoBagCompositions.push(ecoBagComposition)
      // 保留購物袋名稱、ID
      const productInput = {
        productTypeName: bangdongSoloEcoBagName.value,
        productTypeId: bangdongSoloEcoBagId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloEcoBag.id,
        name: bangdongSoloEcoBag.name,
        price: bangdongSoloEcoBag.price,
        value: parseInt(bangdongSoloEcoBag.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEcoBag.quantity = 0
    }
  }

  if (ecoBagCompositions.length > 0) {
    row.name += ` (${ecoBagCompositions.join(', ')})`
  }
  const productInput = {
    id: bangdongSoloProductId.value,
    name: bangdongSoloName.value,
    value: parseInt(totalQuantity),
    price: 0,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 將這個 row 推進 tableRows 中
  tableRows.push(row)
  showbangdongSolo.value = false
}
// editDialog10導入欄位
const bangdongSoloEdit6inchs = reactive([])
const bangdongSoloEdit3inchs = reactive([])
const bangdongSoloEditDrinks = reactive([])
const bangdongSoloEditSideDishes = reactive([])
const bangdongSoloEditBentoMains = reactive([])
const bangdongSoloEditEcoBags = reactive([])
const bangdongSoloEditName = ref('')
const loadBangdongSoloEdit = async () => {
  try {
    // 延遲請求的時間（以毫秒為單位）
    const delay = 100

    // 延遲指定的時間
    await new Promise(resolve => setTimeout(resolve, delay))
    const response = await apiAuth.get('catalog/product/1062')
    const productOptions = response.data.product_options

    // 6吋潤餅
    const burrito6inch = productOptions.burrito_6inch
    const values = burrito6inch.product_option_values

    for (const value of values) {
      const bangdongSoloEdit6inch = {
        id: value.id,
        name: value.name,
        quantity: 0,
        price: value.price,
        hidenquantity: 0
      }
      bangdongSoloEdit6inchs.push(bangdongSoloEdit6inch)
    }
    // 3吋潤餅
    const burrito3inch = productOptions.burrito_3inch
    const burrito3inchValues = burrito3inch.product_option_values
    for (const burrito3inchValue of burrito3inchValues) {
      const bangdongSoloEditBentoMain = {
        id: burrito3inchValue.id,
        name: burrito3inchValue.name,
        quantity: 0,
        price: burrito3inchValue.price,
        hidenquantity: 0
      }
      bangdongSoloEdit3inchs.push(bangdongSoloEditBentoMain)
    }
    // 飲料
    const Drink = productOptions.drink
    const DrinkValues = Drink.product_option_values
    for (const DrinkValue of DrinkValues) {
      const bangdongSoloEditDrink = {
        id: DrinkValue.id,
        name: DrinkValue.name,
        quantity: 0,
        price: DrinkValue.price,
        hidenquantity: 0
      }
      bangdongSoloEditDrinks.push(bangdongSoloEditDrink)
    }
    // 配菜
    const sideDish = productOptions.side_dish
    const sideDishValues = sideDish.product_option_values
    for (const sideDishValue of sideDishValues) {
      const bangdongSoloEditSideDish = {
        id: sideDishValue.id,
        name: sideDishValue.name,
        quantity: 0,
        price: sideDishValue.price,
        hidenquantity: 0,
        is_default: sideDishValue.is_default
      }
      bangdongSoloEditSideDishes.push(bangdongSoloEditSideDish)
    }
    // 副主餐
    const bentoMain = productOptions.bento_main
    const bentoMainValues = bentoMain.product_option_values
    for (const bentoMainValue of bentoMainValues) {
      const bangdongSoloEditBentoMain = {
        id: bentoMainValue.id,
        name: bentoMainValue.name,
        quantity: 0,
        price: bentoMainValue.price,
        hidenquantity: 0
      }
      bangdongSoloEditBentoMains.push(bangdongSoloEditBentoMain)
    }
    // 環保袋
    const ecoBag = productOptions.eco_bag
    const ecoBagValues = ecoBag.product_option_values
    for (const ecoBagValue of ecoBagValues) {
      const bangdongSoloEditEcoBag = {
        id: ecoBagValue.id,
        name: ecoBagValue.name,
        price: ecoBagValue.price,
        quantity: 0,
        hidenquantity: 0
      }
      bangdongSoloEditEcoBags.push(bangdongSoloEditEcoBag)
    }
    bangdongSolo6inchName.value = burrito6inch.name
    bangdongSoloDrinkName.value = Drink.name
    bangdongSoloSideDishName.value = sideDish.name
    bangdongSoloBentoMainName.value = bentoMain.name
    bangdongSoloEditName.value = response.data.name
  } catch (error) {
    console.error(error)
  }
}

// -------------------------------------刪除新增膗存----------------------

// 刪除該行
const deleteRow = (id) => {
  const index = tableRows.findIndex((row) => row.id === id)
  if (index >= 0) {
    tableRows.splice(index, 1)

    // 重新生成 ID
    for (let i = index; i < tableRows.length; i++) {
      tableRows[i].id = tableRows[i].id - 1
    }
  }
}

// 將table資料拆解放回修正欄位

let editingRow = null
let watchers = []
// 找到對應的dialog
function editRowDialog (row) {
  if (row.bentoType === 1) {
    editBangdong1(row)
  } else if (row.bentoType === 2) {
    editBangdong2(row)
  } else if (row.bentoType === 3) {
    editBangdong3(row)
  } else if (row.bentoType === 4) {
    editBangdong4(row)
  } else if (row.bentoType === 5) {
    editRowDialog5(row)
  } else if (row.bentoType === 6) {
    editRowDialog6(row)
  } else if (row.bentoType === 7) {
    editRowDialog7(row)
  } else if (row.bentoType === 8) {
    editRowDialog8(row)
  } else if (row.bentoType === 9) {
    editRowDialog9(row)
  } else if (row.bentoType === 0) {
    editRowDialog0(row)
  } else if (row.bentoType === 10) {
    editBangdongSolo(row)
  } else if (row.bentoType === 11) {
    editBangdongVegetarian1(row)
  } else if (row.bentoType === 12) {
    editBangdongVegetarian2(row)
  }
}
// 招牌便當修改
const editDialog1 = ref(false)
function editBangdong1 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 招牌便當主餐歸零
  for (const bangdong1EditMain of bangdong1EditMains) {
    bangdong1EditMain.quantity = 0
  }
  // 招牌便當飲料歸零
  for (const bangdong1EditDrink of bangdong1EditDrinks) {
    bangdong1EditDrink.quantity = 0
  }
  // 招牌便當配菜歸零
  for (const bangdong1EditSideDish of bangdong1EditSideDishes) {
    bangdong1EditSideDish.quantity = 0
  }
  // 招牌便當副主餐歸零
  for (const bangdong1EditBentoMain of bangdong1EditBentoMains) {
    bangdong1EditBentoMain.quantity = 0
  }
  // 招牌便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdong1EditArbitrarily.value = input.value
    }
    // 招牌便當  主餐  推入input數值
    const mainIndex = bangdong1EditMains.findIndex(
      (bangdong1EditMain) => bangdong1EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong1EditMains[mainIndex].quantity = parseInt(value)
    }
    // 招牌便當  飲料  推入input數值
    const drinkIndex = bangdong1EditDrinks.findIndex(
      (bangdong1EditDrink) => bangdong1EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong1EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 招牌便當  配菜  推入input數值
    const sideDishIndex = bangdong1EditSideDishes.findIndex(
      (bangdong1EditSideDish) => bangdong1EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 招牌便當  副主餐  推入input數值
    const bentoMainIndex = bangdong1EditBentoMains.findIndex(
      (bangdong1EditBentoMain) => bangdong1EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong1EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdong1EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdong1EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog1.value = true
}

// 招牌便當修正欄位總數量計算
const bangdong1EditTotalQuantity = computed(() => {
  return bangdong1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong1EditArbitrarily.value)
})

// 招牌便當單價
const bangdong1EditPrice = computed(() => {
  return bangdong1Price.value
})

// 招牌便當總價格
const bangdong1EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdong1EditTotalQuantity.value * bangdong1EditPrice.value
  bangdong1EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong1EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})

// 關閉修正欄位
function closeEditDialog1 () {
  editDialog1.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog1 () {
  const row = {
    bentoType: 1,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdong1EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdong1EditTotalQuantity.value // 計算總數量
  for (const bangdong1EditMain of bangdong1EditMains) {
    if (bangdong1EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdong1EditMain.name + 'x' + parseInt(bangdong1EditMain.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong1MainMealId.value,
        productTypeName: bangdong1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong1EditMain.id,
        name: bangdong1EditMain.name,
        value: parseInt(bangdong1EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdong1EditDrink of bangdong1EditDrinks) {
    if (bangdong1EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong1EditDrink.name + 'x' + parseInt(bangdong1EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong1DrinkName.value,
        productTypeId: bangdong1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong1EditDrink.id,
        name: bangdong1EditDrink.name,
        value: parseInt(bangdong1EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdong1EditSideDish of bangdong1EditSideDishes) {
    if (bangdong1EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong1EditSideDish.name + 'x' + parseInt(bangdong1EditSideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong1SideDishName.value,
        productTypeId: bangdong1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong1EditSideDish.is_default + ' '
      const input = {
        id: bangdong1EditSideDish.id,
        name: bangdong1EditSideDish.name,
        value: parseInt(bangdong1EditSideDish.quantity),
        is_default: bangdong1EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 保留 招牌便當、1001、數量
  const productInput = {
    id: bangdong1ProductId.value,
    name: bangdong1Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdong1EditPrice.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong1EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong1EditArbitrarily.value).toString()
    const input = {
      id: 'bangdong1EditArbitrarily',
      value: bangdong1EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }

  row.name = bangdong1Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog1.value = false
  bangdong1EditArbitrarily.value = 0
}

// 雞胸便當修改

const editDialog2 = ref(false)

function editBangdong2 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 雞胸便當主餐歸零
  for (const bangdong2EditMain of bangdong2EditMains) {
    bangdong2EditMain.quantity = 0
  }
  // 雞胸便當飲料歸零
  for (const bangdong2EditDrink of bangdong2EditDrinks) {
    bangdong2EditDrink.quantity = 0
  }
  // 雞胸便當配菜歸零
  for (const bangdong2EditSideDish of bangdong2EditSideDishes) {
    bangdong2EditSideDish.quantity = 0
  }
  // 雞胸便當副主餐歸零
  for (const bangdong2EditBentoMain of bangdong2EditBentoMains) {
    bangdong2EditBentoMain.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdong2EditArbitrarily.value = input.value
    }
    // 雞胸便當  主餐  推入input數值
    const mainIndex = bangdong2EditMains.findIndex(
      (bangdong2EditMain) => bangdong2EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong2EditMains[mainIndex].quantity = parseInt(value)
    }
    // 雞胸便當  飲料  推入input數值
    const drinkIndex = bangdong2EditDrinks.findIndex(
      (bangdong2EditDrink) => bangdong2EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong2EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 雞胸便當  配菜  推入input數值
    const sideDishIndex = bangdong2EditSideDishes.findIndex(
      (bangdong2EditSideDish) => bangdong2EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong2EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 雞胸便當  副主餐  推入input數值
    const bentoMainIndex = bangdong2EditBentoMains.findIndex(
      (bangdong2EditBentoMain) => bangdong2EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong2EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdong2EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdong2EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
        // 副主餐的數量跟著主餐的數量變化
        bangdong2EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog2.value = true
}

// 雞胸便當總數量
const bangdong2EditTotalQuantity = computed(() => {
  return bangdong2EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong2EditArbitrarily.value)
})
// 雞胸便當單價
const bangdong2EditPrice = computed(() => {
  return bangdong2Price.value
})
// 雞胸便當總價格
const bangdong2EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdong2EditTotalQuantity.value * bangdong2EditPrice.value
  bangdong2EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong2EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})

// 關閉修正欄位
function closeEditDialog2 () {
  editDialog2.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog2 () {
  const row = {
    bentoType: 2,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong2EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdong2EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong2EditMain of bangdong2EditMains) {
    if (bangdong2EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdong2EditMain.name + 'x' + parseInt(bangdong2EditMain.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong2MainMealId.value,
        productTypeName: bangdong2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong2EditMain.id,
        name: bangdong2EditMain.name,
        value: parseInt(bangdong2EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong2EditDrink of bangdong2EditDrinks) {
    if (bangdong2EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong2EditDrink.name + 'x' + parseInt(bangdong2EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong2DrinkName.value,
        productTypeId: bangdong2DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong2EditDrink.id,
        name: bangdong2EditDrink.name,
        value: parseInt(bangdong2EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong2EditSideDish of bangdong2EditSideDishes) {
    if (bangdong2EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong2EditSideDish.name + 'x' + parseInt(bangdong2EditSideDish.quantity).toString()
      // 保留配菜名稱、ID
      const productInput = {
        productTypeName: bangdong2SideDishName.value,
        productTypeId: bangdong2SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong2EditSideDish.is_default + ' '
      const input = {
        id: bangdong2EditSideDish.id,
        name: bangdong2EditSideDish.name,
        value: parseInt(bangdong2EditSideDish.quantity),
        is_default: bangdong2EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong2EditBentoMain of bangdong2EditBentoMains) {
    if (bangdong2EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong2EditBentoMain.name + 'x' + parseInt(bangdong2EditBentoMain.quantity).toString()
      const productInput = {
        productTypeName: bangdong2BentoMainName.value,
        productTypeId: bangdong2BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong2EditBentoMain.id,
        name: bangdong2EditBentoMain.name,
        value: parseInt(bangdong2EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 保留 雞胸便當、1002、數量
  const productInput = {
    id: bangdong2ProductId.value,
    name: bangdong2Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdong2EditPrice.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong2EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong2EditArbitrarily.value).toString()
    const input = {
      id: 'bangdong2EditArbitrarily',
      value: bangdong2EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong2Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog2.value = false
  bangdong2EditArbitrarily.value = 0
}
// 雞腿便當修改
const editDialog3 = ref(false)
function editBangdong3 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 雞腿便當主餐歸零
  for (const bangdong3EditMain of bangdong3EditMains) {
    bangdong3EditMain.quantity = 0
  }
  // 雞腿便當飲料歸零
  for (const bangdong3EditDrink of bangdong3EditDrinks) {
    bangdong3EditDrink.quantity = 0
  }
  // 雞腿便當配菜歸零
  for (const bangdong3EditSideDish of bangdong3EditSideDishes) {
    bangdong3EditSideDish.quantity = 0
  }
  // 雞腿便當副主餐歸零
  for (const bangdong3EditBentoMain of bangdong3EditBentoMains) {
    bangdong3EditBentoMain.quantity = 0
  }
  // 雞腿便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdong3EditArbitrarily.value = input.value
    }
    // 雞腿便當  主餐  推入input數值
    const mainIndex = bangdong3EditMains.findIndex(
      (bangdong3EditMain) => bangdong3EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong3EditMains[mainIndex].quantity = parseInt(value)
    }
    // 雞腿便當  飲料  推入input數值
    const drinkIndex = bangdong3EditDrinks.findIndex(
      (bangdong3EditDrink) => bangdong3EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong3EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 雞腿便當  配菜  推入input數值
    const sideDishIndex = bangdong3EditSideDishes.findIndex(
      (bangdong3EditSideDish) => bangdong3EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong3EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 雞腿便當  副主餐  推入input數值
    const bentoMainIndex = bangdong3EditBentoMains.findIndex(
      (bangdong3EditBentoMain) => bangdong3EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong3EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdong3EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdong3EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
        // 副主餐的數量跟著主餐的數量變化
        bangdong3EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog3.value = true
}

// 雞腿便當修正區總數量
const bangdong3EditTotalQuantity = computed(() => {
  return bangdong3EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong3EditArbitrarily.value)
})

// 雞腿便當單價
const bangdong3EditPrice = computed(() => {
  return bangdong3Price.value
})
// 雞腿便當總價格
const bangdong3EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdong3EditTotalQuantity.value * bangdong3EditPrice.value
  bangdong3EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong3EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})
// 關閉修正欄位
function closeEditDialog3 () {
  editDialog3.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog3 () {
  const row = {
    bentoType: 3,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong3EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdong3EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong3EditMain of bangdong3EditMains) {
    if (bangdong3EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }
      row.Main += bangdong3EditMain.name + 'x' + parseInt(bangdong3EditMain.quantity).toString()
      // 保留 雞腿便當、1003、數量、主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong3MainMealId.value,
        productTypeName: bangdong3MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong3MainMealId.value,
        name: bangdong3EditMain.name,
        value: parseInt(bangdong3EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong3EditDrink of bangdong3EditDrinks) {
    if (bangdong3EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong3EditDrink.name + 'x' + parseInt(bangdong3EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong3DrinkName.value,
        productTypeId: bangdong3DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong3DrinkId.value,
        name: bangdong3EditDrink.name,
        value: parseInt(bangdong3EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong3EditSideDish of bangdong3EditSideDishes) {
    if (bangdong3EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong3EditSideDish.name + 'x' + parseInt(bangdong3EditSideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong3SideDishName.value,
        productTypeId: bangdong3SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong3EditSideDish.is_default + ' '
      const input = {
        id: bangdong3SideDishId.value,
        name: bangdong3EditSideDish.name,
        value: parseInt(bangdong3EditSideDish.quantity),
        is_default: bangdong3EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong3EditBentoMain of bangdong3EditBentoMains) {
    if (bangdong3EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong3EditBentoMain.name + 'x' + parseInt(bangdong3EditBentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdong3BentoMainName.value,
        productTypeId: bangdong3BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong3BentoMainId.value,
        name: bangdong3EditBentoMain.name,
        value: parseInt(bangdong3EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 保留 雞腿便當、1003、數量
  const productInput = {
    id: bangdong3ProductId.value,
    name: bangdong3Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdong3EditPrice.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdong3EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong3EditArbitrarily.value).toString()
    const input = {
      id: 'bangdong3EditArbitrarily',
      value: bangdong3EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong3Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog3.value = false
  bangdong3EditArbitrarily.value = 0
}

// 滷牛便當修改
const editDialog4 = ref(false)
function editBangdong4 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 滷牛便當主餐歸零
  for (const bangdong4EditMain of bangdong4EditMains) {
    bangdong4EditMain.quantity = 0
  }
  // 滷牛便當飲料歸零
  for (const bangdong4EditDrink of bangdong4EditDrinks) {
    bangdong4EditDrink.quantity = 0
  }
  // 滷牛便當配菜歸零
  for (const bangdong4EditSideDish of bangdong4EditSideDishes) {
    bangdong4EditSideDish.quantity = 0
  }
  // 滷牛便當副主餐歸零
  for (const bangdong4EditBentoMain of bangdong4EditBentoMains) {
    bangdong4EditBentoMain.quantity = 0
  }
  // 滷牛便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdong4EditArbitrarily.value = input.value
    }
    // 滷牛便當  主餐  推入input數值
    const mainIndex = bangdong4EditMains.findIndex(
      (bangdong4EditMain) => bangdong4EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdong4EditMains[mainIndex].quantity = parseInt(value)
    }
    // 滷牛便當  飲料  推入input數值
    const drinkIndex = bangdong4EditDrinks.findIndex(
      (bangdong4EditDrink) => bangdong4EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdong4EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 滷牛便當  配菜  推入input數值
    const sideDishIndex = bangdong4EditSideDishes.findIndex(
      (bangdong4EditSideDish) => bangdong4EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdong4EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 滷牛便當  副主餐  推入input數值
    const bentoMainIndex = bangdong4EditBentoMains.findIndex(
      (bangdong4EditBentoMain) => bangdong4EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdong4EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdong4EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdong4EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '全素潤餅3吋' || main.name === '蛋素潤餅3吋') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '梅汁番茄' || sideDish.name === '鹽水煮蛋' || sideDish.name === '毛豆' || sideDish.name === '玉米') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
        // 副主餐的數量跟著主餐的數量變化
        bangdong4EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog4.value = true
}
// 滷牛便當總數量
const bangdong4EditTotalQuantity = computed(() => {
  return bangdong4EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdong4EditArbitrarily.value)
})
// 滷牛便當單價
const bangdong4EditPrice = computed(() => {
  return bangdong4Price.value
})
// 滷牛便當總價格
const bangdong4EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdong4EditTotalQuantity.value * bangdong4EditPrice.value
  bangdong4EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdong4EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})

// 關閉修正欄位
function closeEditDialog4 () {
  editDialog4.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog4 () {
  const row = {
    bentoType: 4,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdong4EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdong4EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdong4EditMain of bangdong4EditMains) {
    if (bangdong4EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdong4EditMain.name + 'x' + parseInt(bangdong4EditMain.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdong4MainMealId.value,
        productTypeName: bangdong4MainName.value,
        productType: 'options_with_qty'
      }
      row.inputs.push(productInput)
      const input = {
        id: bangdong4EditMain.id,
        name: bangdong4EditMain.name,
        value: parseInt(bangdong4EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdong4EditDrink of bangdong4EditDrinks) {
    if (bangdong4EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdong4EditDrink.name + 'x' + parseInt(bangdong4EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdong4DrinkName.value,
        productTypeId: bangdong4DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong4EditDrink.id,
        name: bangdong4EditDrink.name,
        value: parseInt(bangdong4EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdong4EditSideDish of bangdong4EditSideDishes) {
    if (bangdong4EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdong4EditSideDish.name + 'x' + parseInt(bangdong4EditSideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdong4SideDishName.value,
        productTypeId: bangdong4SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdong4EditSideDish.is_default + ' '
      const input = {
        id: bangdong4EditSideDish.id,
        name: bangdong4EditSideDish.name,
        value: parseInt(bangdong4EditSideDish.quantity),
        is_default: bangdong4EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdong4EditBentoMain of bangdong4EditBentoMains) {
    if (bangdong4EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdong4EditBentoMain.name + 'x' + parseInt(bangdong4EditBentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdong4BentoMainName.value,
        productTypeId: bangdong4BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdong4EditBentoMain.id,
        name: bangdong4EditBentoMain.name,
        value: parseInt(bangdong4EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 保留 滷牛便當、1004、數量
  const productInput = {
    id: bangdong4ProductId.value,
    name: bangdong4Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdong4EditPrice.value,
    totalPrice: row.price
  }
  row.inputs.push(productInput)
  // 保留任搭數量
  if (bangdong4EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdong4EditArbitrarily.value).toString()
    const input = {
      id: 'bangdong4EditArbitrarily',
      value: bangdong4EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdong4Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog4.value = false
  bangdong4EditArbitrarily.value = 0
}
// 素食便當125修改

const editDialogV1 = ref(false)

function editBangdongVegetarian1 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 素食便當125主餐歸零
  for (const bangdongVegetarian1EditMain of bangdongVegetarian1EditMains) {
    bangdongVegetarian1EditMain.quantity = 0
  }
  // 素食便當125飲料歸零
  for (const bangdongVegetarian1EditDrink of bangdongVegetarian1EditDrinks) {
    bangdongVegetarian1EditDrink.quantity = 0
  }
  // 素食便當125配菜歸零
  for (const bangdongVegetarian1EditSideDish of bangdongVegetarian1EditSideDishes) {
    bangdongVegetarian1EditSideDish.quantity = 0
  }
  // 素食便當125副主餐歸零
  for (const bangdongVegetarian1EditBentoMain of bangdongVegetarian1EditBentoMains) {
    bangdongVegetarian1EditBentoMain.quantity = 0
  }
  // 素食便當125主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdongVegetarian1EditArbitrarily.value = input.value
    }
    // 素食便當125  主餐  推入input數值
    const mainIndex = bangdongVegetarian1EditMains.findIndex(
      (bangdongVegetarian1EditMain) => bangdongVegetarian1EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdongVegetarian1EditMains[mainIndex].quantity = parseInt(value)
    }
    // 素食便當125  飲料  推入input數值
    const drinkIndex = bangdongVegetarian1EditDrinks.findIndex(
      (bangdongVegetarian1EditDrink) => bangdongVegetarian1EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdongVegetarian1EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 素食便當125  配菜  推入input數值
    const sideDishIndex = bangdongVegetarian1EditSideDishes.findIndex(
      (bangdongVegetarian1EditSideDish) => bangdongVegetarian1EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdongVegetarian1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 素食便當125  副主餐  推入input數值
    const bentoMainIndex = bangdongVegetarian1EditBentoMains.findIndex(
      (bangdongVegetarian1EditBentoMain) => bangdongVegetarian1EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdongVegetarian1EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdongVegetarian1EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdongVegetarian1EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
        // 副主餐的數量跟著主餐的數量變化
        bangdongVegetarian1EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialogV1.value = true
}

// 素食便當125總數量
const bangdongVegetarian1EditTotalQuantity = computed(() => {
  return bangdongVegetarian1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongVegetarian1EditArbitrarily.value)
})
// 素食便當125單價
const bangdongVegetarian1EditPrice = computed(() => {
  return bangdongVegetarian1Price.value
})
// 素食便當125總價格
const bangdongVegetarian1EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdongVegetarian1EditTotalQuantity.value * bangdongVegetarian1EditPrice.value
  bangdongVegetarian1EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdongVegetarian1EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})

// 關閉修正欄位
function closeEditDialogV1 () {
  editDialogV1.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialogV1 () {
  const row = {
    bentoType: 2,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongVegetarian1EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdongVegetarian1EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdongVegetarian1EditMain of bangdongVegetarian1EditMains) {
    if (bangdongVegetarian1EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdongVegetarian1EditMain.name + 'x' + parseInt(bangdongVegetarian1EditMain.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdongVegetarian1MainMealId.value,
        productTypeName: bangdongVegetarian1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian1EditMain.id,
        name: bangdongVegetarian1EditMain.name,
        value: parseInt(bangdongVegetarian1EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdongVegetarian1EditDrink of bangdongVegetarian1EditDrinks) {
    if (bangdongVegetarian1EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongVegetarian1EditDrink.name + 'x' + parseInt(bangdongVegetarian1EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongVegetarian1DrinkName.value,
        productTypeId: bangdongVegetarian1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian1EditDrink.id,
        name: bangdongVegetarian1EditDrink.name,
        value: parseInt(bangdongVegetarian1EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdongVegetarian1EditSideDish of bangdongVegetarian1EditSideDishes) {
    if (bangdongVegetarian1EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdongVegetarian1EditSideDish.name + 'x' + parseInt(bangdongVegetarian1EditSideDish.quantity).toString()
      // 保留配菜名稱、ID
      const productInput = {
        productTypeName: bangdongVegetarian1SideDishName.value,
        productTypeId: bangdongVegetarian1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongVegetarian1EditSideDish.is_default + ' '
      const input = {
        id: bangdongVegetarian1EditSideDish.id,
        name: bangdongVegetarian1EditSideDish.name,
        value: parseInt(bangdongVegetarian1EditSideDish.quantity),
        is_default: bangdongVegetarian1EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdongVegetarian1EditBentoMain of bangdongVegetarian1EditBentoMains) {
    if (bangdongVegetarian1EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongVegetarian1EditBentoMain.name + 'x' + parseInt(bangdongVegetarian1EditBentoMain.quantity).toString()
      const productInput = {
        productTypeName: bangdongVegetarian1BentoMainName.value,
        productTypeId: bangdongVegetarian1BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian1EditBentoMain.id,
        name: bangdongVegetarian1EditBentoMain.name,
        value: parseInt(bangdongVegetarian1EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 保留素食便當125、1002、數量
  const productInput = {
    id: bangdongVegetarian1ProductId.value,
    name: bangdongVegetarian1Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdongVegetarian1EditPrice.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongVegetarian1EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongVegetarian1EditArbitrarily.value).toString()
    const input = {
      id: 'bangdongVegetarian1EditArbitrarily',
      value: bangdongVegetarian1EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongVegetarian1Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialogV1.value = false
  bangdongVegetarian1EditArbitrarily.value = 0
}

// 素食便當150修改

const editDialogV2 = ref(false)

function editBangdongVegetarian2 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  // 素食便當150主餐歸零
  for (const bangdongVegetarian2EditMain of bangdongVegetarian2EditMains) {
    bangdongVegetarian2EditMain.quantity = 0
  }
  // 素食便當150飲料歸零
  for (const bangdongVegetarian2EditDrink of bangdongVegetarian2EditDrinks) {
    bangdongVegetarian2EditDrink.quantity = 0
  }
  // 素食便當150配菜歸零
  for (const bangdongVegetarian2EditSideDish of bangdongVegetarian2EditSideDishes) {
    bangdongVegetarian2EditSideDish.quantity = 0
  }
  // 素食便當150副主餐歸零
  for (const bangdongVegetarian2EditBentoMain of bangdongVegetarian2EditBentoMains) {
    bangdongVegetarian2EditBentoMain.quantity = 0
  }
  // 素食便當150主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdongVegetarian2EditArbitrarily.value = input.value
    }
    // 素食便當150 主餐 推入input數值
    const mainIndex = bangdongVegetarian2EditMains.findIndex(
      (bangdongVegetarian2EditMain) => bangdongVegetarian2EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdongVegetarian2EditMains[mainIndex].quantity = parseInt(value)
    }
    // 素食便當150 飲料 推入input數值
    const drinkIndex = bangdongVegetarian2EditDrinks.findIndex(
      (bangdongVegetarian2EditDrink) => bangdongVegetarian2EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdongVegetarian2EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 素食便當150 配菜 推入input數值
    const sideDishIndex = bangdongVegetarian2EditSideDishes.findIndex(
      (bangdongVegetarian2EditSideDish) => bangdongVegetarian2EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdongVegetarian2EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 素食便當150 副主餐 推入input數值
    const bentoMainIndex = bangdongVegetarian2EditBentoMains.findIndex(
      (bangdongVegetarian2EditBentoMain) => bangdongVegetarian2EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdongVegetarian2EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  bangdongVegetarian2EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        bangdongVegetarian2EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
        // 副主餐的數量跟著主餐的數量變化
        bangdongVegetarian2EditBentoMains.forEach(bentoMain => {
          const diff = Number(newVal) - Number(oldVal)
          const newQuantity = Number(bentoMain.quantity) + diff

          // 確保副主餐數量不會變成負數
          bentoMain.quantity = newQuantity >= 0 ? newQuantity : 0
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialogV2.value = true
}

// 素食便當150總數量
const bangdongVegetarian2EditTotalQuantity = computed(() => {
  return bangdongVegetarian2EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongVegetarian2EditArbitrarily.value)
})
// 素食便當150單價
const bangdongVegetarian2EditPrice = computed(() => {
  return bangdongVegetarian2Price.value
})
// 素食便當150總價格
const bangdongVegetarian2EditTotalQuantityPrice = computed(() => {
  let totalPrice = bangdongVegetarian2EditTotalQuantity.value * bangdongVegetarian2EditPrice.value
  bangdongVegetarian2EditDrinks.forEach((drink) => {
    totalPrice += drink.quantity * drink.price
  })
  bangdongVegetarian2EditSideDishes.forEach((sideDish) => {
    totalPrice += sideDish.quantity * sideDish.price
  })

  return totalPrice
})

// 關閉修正欄位
function closeEditDialogV2 () {
  editDialogV2.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialogV2 () {
  const row = {
    bentoType: 12,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongVegetarian2EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdongVegetarian2EditTotalQuantity.value // 計算總數量

  // 儲存推入主餐置入table
  for (const bangdongVegetarian2EditMain of bangdongVegetarian2EditMains) {
    if (bangdongVegetarian2EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += ','
      }

      row.Main += bangdongVegetarian2EditMain.name + 'x' + parseInt(bangdongVegetarian2EditMain.quantity).toString()
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: bangdongVegetarian2MainMealId.value,
        productTypeName: bangdongVegetarian2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian2EditMain.id,
        name: bangdongVegetarian2EditMain.name,
        value: parseInt(bangdongVegetarian2EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入飲料置入table
  for (const bangdongVegetarian2EditDrink of bangdongVegetarian2EditDrinks) {
    if (bangdongVegetarian2EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongVegetarian2EditDrink.name + 'x' + parseInt(bangdongVegetarian2EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongVegetarian2DrinkName.value,
        productTypeId: bangdongVegetarian2DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian2EditDrink.id,
        name: bangdongVegetarian2EditDrink.name,
        value: parseInt(bangdongVegetarian2EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入配菜置入table
  for (const bangdongVegetarian2EditSideDish of bangdongVegetarian2EditSideDishes) {
    if (bangdongVegetarian2EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ','
      }
      row.sideDishes += bangdongVegetarian2EditSideDish.name + 'x' +
parseInt(bangdongVegetarian2EditSideDish.quantity).toString()
// 保留配菜名稱、ID
      const productInput = {
        productTypeName: bangdongVegetarian2SideDishName.value,
        productTypeId: bangdongVegetarian2SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongVegetarian2EditSideDish.is_default + ' '
      const input = {
        id: bangdongVegetarian2EditSideDish.id,
        name: bangdongVegetarian2EditSideDish.name,
        value: parseInt(bangdongVegetarian2EditSideDish.quantity),
        is_default: bangdongVegetarian2EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdongVegetarian2EditBentoMain of bangdongVegetarian2EditBentoMains) {
    if (bangdongVegetarian2EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongVegetarian2EditBentoMain.name + 'x' +
parseInt(bangdongVegetarian2EditBentoMain.quantity).toString()
      const productInput = {
        productTypeName: bangdongVegetarian2BentoMainName.value,
        productTypeId: bangdongVegetarian2BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongVegetarian2EditBentoMain.id,
        name: bangdongVegetarian2EditBentoMain.name,
        value: parseInt(bangdongVegetarian2EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  // 保留素食便當150、1002、數量
  const productInput = {
    id: bangdongVegetarian2ProductId.value,
    name: bangdongVegetarian2Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdongVegetarian2EditPrice.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongVegetarian2EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongVegetarian2EditArbitrarily.value).toString()
    const input = {
      id: 'bangdongVegetarian2EditArbitrarily',
      value: bangdongVegetarian2EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongVegetarian2Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialogV2.value = false
  bangdongVegetarian2EditArbitrarily.value = 0
}
// 客製便當修改
function editRowDialog9 (row) {
  // 客製招牌便當主餐歸零
  for (const bangdongCustom1EditMain of bangdongCustom1EditMains) {
    bangdongCustom1EditMain.quantity = 0
  }
  // 客製招牌便當飲料歸零
  for (const bangdongCustom1EditDrink of bangdongCustom1EditDrinks) {
    bangdongCustom1EditDrink.quantity = 0
  }
  // 客製招牌便當配菜歸零
  for (const bangdongCustom1EditSideDish of bangdongCustom1EditSideDishes) {
    bangdongCustom1EditSideDish.quantity = 0
  }
  // 客製招牌便當副主餐歸零
  for (const bangdongCustom1EditBentoMain of bangdongCustom1EditBentoMains) {
    bangdongCustom1EditBentoMain.quantity = 0
  }
  // 客製招牌便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      bangdongCustom1EditArbitrarily.value = input.value
    }
    // 客製招牌便當  主餐  推入input數值
    const mainIndex = bangdongCustom1EditMains.findIndex(
      (bangdongCustom1EditMain) => bangdongCustom1EditMain.name === name
    )
    if (mainIndex >= 0) {
      bangdongCustom1EditMains[mainIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  飲料  推入input數值
    const drinkIndex = bangdongCustom1EditDrinks.findIndex(
      (bangdongCustom1EditDrink) => bangdongCustom1EditDrink.name === name
    )
    if (drinkIndex >= 0) {
      bangdongCustom1EditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  配菜  推入input數值
    const sideDishIndex = bangdongCustom1EditSideDishes.findIndex(
      (bangdongCustom1EditSideDish) => bangdongCustom1EditSideDish.name === name
    )
    if (sideDishIndex >= 0) {
      bangdongCustom1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 客製招牌便當  副主餐  推入input數值
    const bentoMainIndex = bangdongCustom1EditBentoMains.findIndex(
      (bangdongCustom1EditBentoMain) => bangdongCustom1EditBentoMain.name === name
    )
    if (bentoMainIndex >= 0) {
      bangdongCustom1EditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
  }

  const totalQuantity = parseFloat(row.price) // 取 bangdongCustom1TotalQuantity 的值

  bangdongCustom1EditPrice.value = totalQuantity / bangdongCustom1EditTotalQuantity.value // 将 rowPrice / totalQuantity 的值赋给 bangdongCustom1EditPrice

  editingRow = row
  editDialog9.value = true
}
// 客製便當總數量
const bangdongCustom1EditTotalQuantity = computed(() => {
  return bangdongCustom1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(bangdongCustom1EditArbitrarily.value)
})
// 客製便當總價格
const bangdongCustom1EditPrice = ref(0)
const bangdongCustom1EditTotalQuantityPrice = computed(() => {
  return bangdongCustom1EditTotalQuantity.value * bangdongCustom1EditPrice.value
})

// 關閉修正欄位
function closeEditDialog9 () {
  editDialog9.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog9 () {
  const row = {
    bentoType: 9,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    sideDishDefault: '',
    price: bangdongCustom1EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalEditQuantity = bangdongCustom1EditTotalQuantity.value // 計算總數量
  for (const bangdongCustom1EditMain of bangdongCustom1EditMains) {
    if (bangdongCustom1EditMain.quantity > 0) {
      if (row.Main !== '') {
        row.Main += '、'
      }

      row.Main += bangdongCustom1EditMain.name + 'x' + parseInt(bangdongCustom1EditMain.quantity).toString()
      const productInput = {
        productTypeId: bangdongCustom1MainMealId.value,
        productTypeName: bangdongCustom1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongCustom1EditMain.id,
        name: bangdongCustom1EditMain.name,
        value: parseInt(bangdongCustom1EditMain.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdongCustom1EditDrink of bangdongCustom1EditDrinks) {
    if (bangdongCustom1EditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += '、'
      }
      row.drinks += bangdongCustom1EditDrink.name + 'x' + parseInt(bangdongCustom1EditDrink.quantity).toString()
      // 保留飲料名稱、飲料ID
      const productInput = {
        productTypeName: bangdongCustom1DrinkName.value,
        productTypeId: bangdongCustom1DrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongCustom1EditDrink.id,
        name: bangdongCustom1EditDrink.name,
        value: parseInt(bangdongCustom1EditDrink.quantity)
      }
      row.inputs.push(input)
    }
  }

  for (const bangdongCustom1EditSideDish of bangdongCustom1EditSideDishes) {
    if (bangdongCustom1EditSideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += '、'
      }
      row.sideDishes += bangdongCustom1EditSideDish.name + 'x' + parseInt(bangdongCustom1EditSideDish.quantity).toString()
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: bangdongCustom1SideDishName.value,
        productTypeId: bangdongCustom1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      row.sideDishDefault += bangdongCustom1EditSideDish.is_default + ' '
      const input = {
        id: bangdongCustom1EditSideDish.id,
        name: bangdongCustom1EditSideDish.name,
        value: parseInt(bangdongCustom1EditSideDish.quantity),
        is_default: bangdongCustom1EditSideDish.is_default
      }
      row.inputs.push(input)
    }
  }
  // 儲存推入副主餐置入table
  for (const bangdongCustom1EditBentoMain of bangdongCustom1EditBentoMains) {
    if (bangdongCustom1EditBentoMain.quantity > 0) {
      if (row.bentoMains !== '') {
        row.bentoMains += ','
      }
      row.bentoMains += bangdongCustom1EditBentoMain.name + 'x' + parseInt(bangdongCustom1EditBentoMain.quantity).toString()
      // 保留副主餐名稱、副主餐ID
      const productInput = {
        productTypeName: bangdongCustom1BentoMainName.value,
        productTypeId: bangdongCustom1BentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongCustom1EditBentoMain.id,
        name: bangdongCustom1EditBentoMain.name,
        value: parseInt(bangdongCustom1EditBentoMain.quantity)
      }
      row.inputs.push(input)
    }
  }
  const productInput = {
    id: bangdongCustom1ProductId.value,
    name: bangdongCustom1Name.value,
    value: parseInt(totalEditQuantity),
    price: bangdongCustom1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (bangdongCustom1EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(bangdongCustom1EditArbitrarily.value).toString()
    const input = {
      id: 'bangdongCustom1EditArbitrarily',
      value: bangdongCustom1EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = bangdongCustom1Name.value + totalEditQuantity + '份' // 使用總數量
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog9.value = false
  bangdongCustom1EditArbitrarily.value = 0
}

// 經濟盒餐修改
const editDialog5 = ref(false)
function editRowDialog5 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  for (const main of lunchBox1EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox1EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      lunchBox1EditArbitrarily.value = input.value
    }
    const mainIndex = lunchBox1EditMains.findIndex(
      (lunchBox1EditMain) => lunchBox1EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox1EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox1EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBox1EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  lunchBox1EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        lunchBox1EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog5.value = true
}
// 經濟盒餐修改總數量
const lunchBox1EditTotalQuantity = computed(() => {
  return lunchBox1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox1EditArbitrarily.value)
})

// 經濟盒餐修改單價
const lunchBox1EditPrice = computed(() => {
  return lunchBox1Price.value
})
// 經濟盒餐修改總價格
const lunchBox1EditTotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox1EditTotalQuantity.value * lunchBox1Price.value
  lunchBox1EditSideDishes.forEach(sideDish => {
    totalPrice += sideDish.price * sideDish.quantity
  })
  return totalPrice
})
function closeEditDialog5 () {
  editDialog5.value = false
}

const saveEditDialog5 = () => {
  const row = {
    bentoType: 5,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox1EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalEditQuantity = lunchBox1EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox1EditMains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox1DrinkName.value,
            productTypeId: lunchBox1DrinkId.value,
            productType: 'options_with_qty'
          }
          row.inputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 經濟盒餐、1005、數量、主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox1MainMealId.value,
        productTypeName: lunchBox1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBox1EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox1SideDishName.value,
        productTypeId: lunchBox1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 經濟盒餐、1005、數量
  const productInput = {
    id: lunchBox1ProductId.value,
    name: lunchBox1Name.value,
    value: parseInt(totalEditQuantity),
    price: lunchBox1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox1EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox1EditArbitrarily.value).toString()
    const input = {
      id: 'lunchBox1EditArbitrarily',
      value: lunchBox1EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }

  row.name = lunchBox1Name.value + totalEditQuantity + '份' // 使用總數量
  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog5.value = false
  lunchBox1EditArbitrarily.value = 0
}

// 會議盒餐修改
const editDialog6 = ref(false)
function editRowDialog6 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  for (const main of lunchBox2EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox2EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      lunchBox2EditArbitrarily.value = input.value
    }
    const mainIndex = lunchBox2EditMains.findIndex(
      (lunchBox2EditMain) => lunchBox2EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox2EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox2EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBox2EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox2EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }

  // 監聽主餐的數量變化
  lunchBox2EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        lunchBox2EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })
  editingRow = row
  editDialog6.value = true
}
// 會議盒餐修改總數量
const lunchBox2EditTotalQuantity = computed(() => {
  return lunchBox2EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox2EditArbitrarily.value)
})

// 會議盒餐修改單價
const lunchBox2EditPrice = computed(() => {
  return lunchBox2Price.value
})
// 會議盒餐修改總價格
const lunchBox2EditTotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox2EditTotalQuantity.value * lunchBox2Price.value
  lunchBox2EditSideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

function closeEditDialog6 () {
  editDialog6.value = false
}

const saveEditDialog6 = () => {
  const row = {
    bentoType: 6,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox2EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalEditQuantity = lunchBox2EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox2EditMains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox2DrinkName.value,
            productTypeId: lunchBox2DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 會議盒餐、1005、數量、主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox2MainMealId.value,
        productTypeName: lunchBox2MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBox2EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox2SideDishName.value,
        productTypeId: lunchBox2SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 會議盒餐、1006、數量
  const productInput = {
    id: lunchBox2ProductId.value,
    name: lunchBox2Name.value,
    value: parseInt(totalEditQuantity),
    price: lunchBox2Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox2EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox2EditArbitrarily.value).toString()
    const input = {
      id: 'lunchBox2EditArbitrarily',
      value: lunchBox2EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox2Name.value + totalEditQuantity + '份' // 使用總數量
  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog6.value = false
  lunchBox2EditArbitrarily.value = 0
}

// 貴賓盒餐修改
const editDialog7 = ref(false)
function editRowDialog7 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  for (const main of lunchBox3EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox3EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      lunchBox3EditArbitrarily.value = input.value
    }
    const mainIndex = lunchBox3EditMains.findIndex(
      (lunchBox3EditMain) => lunchBox3EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox3EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox3EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBox3EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox3EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  lunchBox3EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        lunchBox3EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog7.value = true
}
// 貴賓盒餐修改總數量
const lunchBox3EditTotalQuantity = computed(() => {
  return lunchBox3EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox3EditArbitrarily.value)
})

// 貴賓盒餐修改單價
const lunchBox3EditPrice = computed(() => {
  return lunchBox3Price.value
})
// 貴賓盒餐修改總價格
const lunchBox3EditTotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox3EditTotalQuantity.value * lunchBox3Price.value
  lunchBox3EditSideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

function closeEditDialog7 () {
  editDialog7.value = false
}

const saveEditDialog7 = () => {
  const row = {
    bentoType: 7,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox3EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalEditQuantity = lunchBox3EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox3EditMains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox3DrinkName.value,
            productTypeId: lunchBox3DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox3MainMealId.value,
        productTypeName: lunchBox3MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBox3EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox3SideDishName.value,
        productTypeId: lunchBox3SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 貴賓盒餐、1007、數量
  const productInput = {
    id: lunchBox3ProductId.value,
    name: lunchBox3Name.value,
    value: parseInt(totalEditQuantity),
    price: lunchBox3Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox3EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox3EditArbitrarily.value).toString()
    const input = {
      id: 'lunchBox3EditArbitrarily',
      value: lunchBox3EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox3Name.value + totalEditQuantity + '份' // 使用總數量
  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog7.value = false
  lunchBox3EditArbitrarily.value = 0
}

// 首席盒餐修改
const editDialog8 = ref(false)
function editRowDialog8 (row) {
  watchers.forEach(unwatch => unwatch())
  watchers = []
  for (const main of lunchBox4EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBox4EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      lunchBox4EditArbitrarily.value = input.value
    }
    const mainIndex = lunchBox4EditMains.findIndex(
      (lunchBox4EditMain) => lunchBox4EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBox4EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBox4EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBox4EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBox4EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
  }
  // 監聽主餐的數量變化
  lunchBox4EditMains.forEach(main => {
    const unwatch = watch(() => main.quantity, (newVal, oldVal) => {
      if (newVal !== oldVal) {
        // 配菜的數量跟著主餐的數量變化
        lunchBox4EditSideDishes.forEach(sideDish => {
          const diff = Number(newVal) - Number(oldVal)
          if (main.name === '123' || main.name === '123') {
            if (sideDish.name === '酥炸菇菇' || sideDish.name === '芋頭糕' || sideDish.name === '水果' || sideDish.name === '手作蛋塔') {
              if (newVal === 0) {
                sideDish.quantity = 0
              } else {
                sideDish.quantity = Number(sideDish.quantity) + diff
              }
            }
          } else if (sideDish.is_default) {
            if (newVal === 0) {
              sideDish.quantity = 0
            } else {
              sideDish.quantity = Number(sideDish.quantity) + diff
            }
          }
        })
      }
    })
    // Store unwatch reference
    watchers.push(unwatch)
  })

  editingRow = row
  editDialog8.value = true
  lunchBox4EditArbitrarily.value = 0
}
// 首席盒餐修改總數量
const lunchBox4EditTotalQuantity = computed(() => {
  return lunchBox4EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBox4EditArbitrarily.value)
})

// 首席盒餐修改單價
const lunchBox4EditPrice = computed(() => {
  return lunchBox4Price.value
})
// 首席盒餐修改總價格
const lunchBox4EditTotalQuantityPrice = computed(() => {
  let totalPrice = lunchBox4EditTotalQuantity.value * lunchBox4Price.value
  lunchBox4EditSideDishes.forEach(sideDish => {
    totalPrice += sideDish.quantity * sideDish.price
  })
  return totalPrice
})

function closeEditDialog8 () {
  editDialog8.value = false
}

const saveEditDialog8 = () => {
  const row = {
    bentoType: 8,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBox4EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalEditQuantity = lunchBox4EditTotalQuantity.value // 計算總數量
  for (const option of lunchBox4EditMains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBox4DrinkName.value,
            productTypeId: lunchBox4DrinkId.value,
            productType: 'options_with_qty'
          }
          row.productInputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐名稱、主餐ID
      const productInput = {
        productTypeId: lunchBox4MainMealId.value,
        productTypeName: lunchBox4MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBox4EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBox4SideDishName.value,
        productTypeId: lunchBox4SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 首席盒餐、1008、數量
  const productInput = {
    id: lunchBox4ProductId.value,
    name: lunchBox4Name.value,
    value: parseInt(totalEditQuantity),
    price: lunchBox4Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBox4EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBox4EditArbitrarily.value).toString()
    const input = {
      id: 'lunchBox4EditArbitrarily',
      value: lunchBox4EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBox4Name.value + totalEditQuantity + '份' // 使用總數量
  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog8.value = false
}
// 客製盒餐修改
function editRowDialog0 (row) {
  for (const main of lunchBoxCustom1EditMains) {
    main.quantity = 0
    for (const drink of main.drinks) {
      drink.quantity = 0
    }
  }

  for (const sideDish of lunchBoxCustom1EditSideDishes) {
    sideDish.quantity = 0
  }
  for (const input of row.inputs) {
    const mainId = input.mainId
    const name = input.name
    const value = input.value
    // 任意搭配抓取推入
    if (input.name === '任意搭配') {
      lunchBoxCustom1EditArbitrarily.value = input.value
    }
    const mainIndex = lunchBoxCustom1EditMains.findIndex(
      (lunchBoxCustom1EditMain) => lunchBoxCustom1EditMain.name === name
    )
    if (mainIndex >= 0) {
      lunchBoxCustom1EditMains[mainIndex].quantity = parseInt(value)
    }
    for (const main of lunchBoxCustom1EditMains) {
      if (main.id === mainId) {
        if (main.name === name) {
          main.quantity = parseInt(value)
        } else {
          for (const drink of main.drinks) {
            if (drink.name === name) {
              drink.quantity = parseInt(value)
            }
          }
        }
      }
    }

    const sideDishIndex = lunchBoxCustom1EditSideDishes.findIndex(sideDish => sideDish.name === name)
    if (sideDishIndex >= 0) {
      lunchBoxCustom1EditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    const totalQuantity = parseFloat(row.price) // 获取 lunchBoxCustom1TotalQuantity 的值

    lunchBoxCustom1EditPrice.value = totalQuantity / lunchBoxCustom1EditTotalQuantity.value // 将 rowPrice / totalQuantity 的值赋给 lunchBoxCustom1EditPrice
  }

  editingRow = row
  editDialog0.value = true
}

const lunchBoxCustom1EditTotalQuantity = computed(() => {
  return lunchBoxCustom1EditMains.reduce((total, current) => {
    return total + parseInt(current.quantity)
  }, 0) + parseInt(lunchBoxCustom1EditArbitrarily.value)
})

const lunchBoxCustom1EditPrice = ref(0)
const lunchBoxCustom1EditTotalQuantityPrice = computed(() => {
  return lunchBoxCustom1EditTotalQuantity.value * lunchBoxCustom1EditPrice.value
})

const editDialog0 = ref(false)
function closeEditDialog0 () {
  editDialog0.value = false
}

const saveEditDialog0 = () => {
  const row = {
    bentoType: 0,
    id: editingRow.id,
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: lunchBoxCustom1EditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }
  const totalEditQuantity = lunchBoxCustom1EditTotalQuantity.value // 計算總數量
  for (const option of lunchBoxCustom1EditMains) {
    if (option.quantity > 0) {
      let Main = option.name + 'x' + parseInt(option.quantity)
      let drinkInfo = ''

      for (const drink of option.drinks) {
        if (drink.quantity > 0) {
          if (drinkInfo !== '') {
            drinkInfo += ', '
          }
          drinkInfo += drink.name + 'x' + parseInt(drink.quantity)
          // 保留飲料名稱、飲料ID
          const productInput = {
            mainId: option.id,
            productTypeName: lunchBoxCustom1DrinkName.value,
            productTypeId: lunchBoxCustom1DrinkId.value,
            productType: 'options_with_qty'
          }
          row.inputs.push(productInput)
          // 將帶有數值的input推進inputs
          const input = {
            id: drink.id,
            mainId: option.id,
            name: drink.name,
            value: parseInt(drink.quantity)
          }
          row.inputs.push(input)
          drink.quantity = 0
        }
      }

      if (drinkInfo !== '') {
        Main += ` (${drinkInfo})`
      }

      if (row.Main !== '') {
        row.Main += ', '
      }

      row.Main += Main
      // 保留 主餐ID
      const productInput = {
        productTypeId: lunchBoxCustom1MainMealId.value,
        productTypeName: lunchBoxCustom1MainName.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: option.id,
        name: option.name,
        value: parseInt(option.quantity)
      }
      row.inputs.push(input)
      option.quantity = 0
    }
  }

  for (const sideDish of lunchBoxCustom1EditSideDishes) {
    if (sideDish.quantity > 0) {
      if (row.sideDishes !== '') {
        row.sideDishes += ', '
      }
      row.sideDishes += sideDish.name + 'x' + parseInt(sideDish.quantity)
      // 保留配菜名稱、配菜ID
      const productInput = {
        productTypeName: lunchBoxCustom1SideDishName.value,
        productTypeId: lunchBoxCustom1SideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      // 將帶有數值的input推進inputs
      const input = {
        id: sideDish.id,
        name: sideDish.name,
        value: parseInt(sideDish.quantity),
        is_default: sideDish.is_default
      }
      row.inputs.push(input)
      sideDish.quantity = 0
    }
  }
  // 保留 客製盒餐、數量、主餐名稱
  const productInput = {
    id: lunchBoxCustom1ProductId.value,
    name: lunchBoxCustom1Name.value,
    value: parseInt(totalEditQuantity),
    price: lunchBoxCustom1Price.value,
    totalPrice: row.price
  }
  row.productInputs.push(productInput)
  // 保留任搭數量
  if (lunchBoxCustom1EditArbitrarily.value > 0) {
    if (row.Main !== '') {
      row.Main += ','
    }
    row.Main += '任意搭配' + 'x' + parseInt(lunchBoxCustom1EditArbitrarily.value).toString()
    const input = {
      id: 'lunchBoxCustom1EditArbitrarily',
      value: lunchBoxCustom1EditArbitrarily.value,
      name: '任意搭配'
    }
    row.inputs.push(input)
  }
  row.name = lunchBoxCustom1Name.value + totalEditQuantity + '份' // 使用總數量
  if (row.Main !== '' || row.sideDishes !== '') {
    const rowIndex = tableRows.findIndex((item) => item.id === editingRow.id)
    tableRows.splice(rowIndex, 1, row)
  }

  editDialog0.value = false
  lunchBoxCustom1EditArbitrarily.value = 0
}
// 單點修改
function editBangdongSolo (row) {
  // 6吋潤餅歸零
  for (const bangdongSoloEdit6inch of bangdongSoloEdit6inchs) {
    bangdongSoloEdit6inch.quantity = 0
  }
  // 3吋潤筆歸零
  for (const bangdongSoloEdit3inch of bangdongSoloEdit3inchs) {
    bangdongSoloEdit3inch.quantity = 0
  }
  // 飲料歸零
  for (const bangdongSoloEditDrink of bangdongSoloEditDrinks) {
    bangdongSoloEditDrink.quantity = 0
  }
  // 配菜歸零
  for (const bangdongSoloEditSideDish of bangdongSoloEditSideDishes) {
    bangdongSoloEditSideDish.quantity = 0
  }
  // 副主餐歸零
  for (const bangdongSoloEditBentoMain of bangdongSoloEditBentoMains) {
    bangdongSoloEditBentoMain.quantity = 0
  }
  // 環保袋歸零
  for (const bangdongSoloEditEcoBag of bangdongSoloEditEcoBags) {
    bangdongSoloEditEcoBag.quantity = 0
  }
  // 雞胸便當主餐隱藏欄位歸零
  for (const input of row.inputs) {
    const name = input.name
    const value = input.value
    // 6吋潤餅 推入input數值
    const mainIndex = bangdongSoloEdit6inchs.findIndex((bangdongSoloEdit6inch) => bangdongSoloEdit6inch.name === name)
    if (mainIndex >= 0) {
      bangdongSoloEdit6inchs[mainIndex].quantity = parseInt(value)
    }
    // 3吋潤筆 推入input數值
    const threeInchIndex = bangdongSoloEdit3inchs.findIndex((bangdongSoloEdit3inch) => bangdongSoloEdit3inch.name === name)
    if (threeInchIndex >= 0) {
      bangdongSoloEdit3inchs[threeInchIndex].quantity = parseInt(value)
    }
    // 飲料 推入input數值
    const drinkIndex = bangdongSoloEditDrinks.findIndex((bangdongSoloEditDrink) => bangdongSoloEditDrink.name === name)
    if (drinkIndex >= 0) {
      bangdongSoloEditDrinks[drinkIndex].quantity = parseInt(value)
    }
    // 配菜 推入input數值
    const sideDishIndex = bangdongSoloEditSideDishes.findIndex((bangdongSoloEditSideDish) => bangdongSoloEditSideDish.name === name)
    if (sideDishIndex >= 0) {
      bangdongSoloEditSideDishes[sideDishIndex].quantity = parseInt(value)
    }
    // 副主餐 推入input數值
    const bentoMainIndex = bangdongSoloEditBentoMains.findIndex((bangdongSoloEditBentoMain) => bangdongSoloEditBentoMain.name === name)
    if (bentoMainIndex >= 0) {
      bangdongSoloEditBentoMains[bentoMainIndex].quantity = parseInt(value)
    }
    // 環保袋 推入input數值
    const ecoBagIndex = bangdongSoloEditEcoBags.findIndex((bangdongSoloEditEcoBag) => bangdongSoloEditEcoBag.name === name)
    if (ecoBagIndex >= 0) {
      bangdongSoloEditEcoBags[ecoBagIndex].quantity = parseInt(value)
    }
  }

  editingRow = row
  editDialog10.value = true
}

// 計算總數量
const bangdongSoloEditTotalQuantity = computed(() => {
  let total = 0
  total += bangdongSoloEdit6inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEdit3inchs.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditDrinks.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditSideDishes.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditBentoMains.reduce((sum, item) => sum + Number(item.quantity), 0)
  total += bangdongSoloEditEcoBags.reduce((sum, item) => sum + Number(item.quantity), 0)

  return total
})
// 計算總價格
const bangdongSoloEditTotalQuantityPrice = computed(() => {
  let total = 0
  total += bangdongSoloEdit6inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEdit3inchs.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditDrinks.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditSideDishes.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditBentoMains.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)
  total += bangdongSoloEditEcoBags.reduce((sum, item) => sum + Number(item.quantity) * Number(item.price), 0)

  return total
})
// 關閉修正欄位
function closeEditDialog10 () {
  editDialog10.value = false
}
// 完成後儲存並且將資料推進tableRows刪除原本的資料
function saveEditDialog10 () {
  const row = {
    bentoType: 10,
    id: editingRow.id, // 使用新生成的 ID
    name: '',
    Main: '',
    drinks: '',
    sideDishes: '',
    bentoMains: '',
    sideDishDefault: '',
    price: bangdongSoloEditTotalQuantityPrice.value,
    inputs: [],
    productInputs: []
  }

  const totalQuantity = bangdongSoloEditTotalQuantity.value

  // 儲存推入潤餅置入table
  // 6吋潤餅
  const bangdongSoloEdit6inchCompositions = []
  for (const bangdongSoloEdit6inch of bangdongSoloEdit6inchs) {
    if (bangdongSoloEdit6inch.quantity > 0) {
      const bangdongSoloEdit6inchComposition = `${bangdongSoloEdit6inch.name} x${bangdongSoloEdit6inch.quantity}`
      bangdongSoloEdit6inchCompositions.push(bangdongSoloEdit6inchComposition)
      // 保留6吋潤餅名稱、ID
      const productInput = {
        productTypeName: bangdongSolo6inchName.value,
        productTypeId: bangdongSolo6inchId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloEdit6inch.id,
        name: bangdongSoloEdit6inch.name,
        value: parseInt(bangdongSoloEdit6inch.quantity)
      }
      row.inputs.push(input)

      bangdongSoloEdit6inch.quantity = 0
    }
  }
  // 3吋潤餅
  const bangdongSoloEdit3inchCompositions = []
  for (const bangdongSoloEdit3inch of bangdongSoloEdit3inchs) {
    if (bangdongSoloEdit3inch.quantity > 0) {
      const bangdongSoloEdit3inchComposition = `${bangdongSoloEdit3inch.name} x${bangdongSoloEdit3inch.quantity}`
      bangdongSoloEdit3inchCompositions.push(bangdongSoloEdit3inchComposition)
      // 保留3吋潤餅名稱、ID
      const productInput = {
        productTypeName: bangdongSolo3inchName.value,
        productTypeId: bangdongSolo3inchId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloEdit3inch.id,
        name: bangdongSoloEdit3inch.name,
        value: parseInt(bangdongSoloEdit3inch.quantity)
      }
      row.inputs.push(input)

      bangdongSoloEdit3inch.quantity = 0
    }
  }

  if (bangdongSoloEdit6inchCompositions.length > 0) {
    row.Main += `${bangdongSolo6inchName.value} (${bangdongSoloEdit6inchCompositions.join(', ')})`
  }

  if (bangdongSoloEdit3inchCompositions.length > 0) {
    if (bangdongSoloEdit6inchCompositions.length > 0) {
      row.Main += ', '
    }
    row.Main += `${bangdongSolo3inchName.value}  (${bangdongSoloEdit3inchCompositions.join(', ')})`
  }
  // 儲存推入飲料置入table
  for (const bangdongSoloEditDrink of bangdongSoloEditDrinks) {
    if (bangdongSoloEditDrink.quantity > 0) {
      if (row.drinks !== '') {
        row.drinks += ','
      }
      row.drinks += bangdongSoloEditDrink.name + 'x' + parseInt(bangdongSoloEditDrink.quantity).toString()
      // 保留飲料名稱、ID
      const productInput = {
        productTypeName: bangdongSoloDrinkName.value,
        productTypeId: bangdongSoloDrinkId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloEditDrink.id,
        name: bangdongSoloEditDrink.name,
        price: bangdongSoloEditDrink.price,
        value: parseInt(bangdongSoloEditDrink.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEditDrink.quantity = 0
    }
  }
  // 儲存推入配菜置入table
  const bangdongSoloEditSideDishCompositions = []
  for (const bangdongSoloEditSideDish of bangdongSoloEditSideDishes) {
    if (bangdongSoloEditSideDish.quantity > 0) {
      const bangdongSoloEditSideDishComposition = `${bangdongSoloEditSideDish.name} x${bangdongSoloEditSideDish.quantity}`
      bangdongSoloEditSideDishCompositions.push(bangdongSoloEditSideDishComposition)
      // console.log(bangdongSoloEditSideDishComposition)
      // 保留配菜名稱、ID
      const productInput = {
        productTypeName: bangdongSoloSideDishName.value,
        productTypeId: bangdongSoloSideDishId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        id: bangdongSoloEditSideDish.id,
        name: bangdongSoloEditSideDish.name,
        price: bangdongSoloEditSideDish.price,
        value: parseInt(bangdongSoloEditSideDish.quantity),
        is_default: bangdongSoloEditSideDish.is_default
      }
      row.inputs.push(input)

      bangdongSoloEditSideDish.quantity = 0
    }
  }
  // 儲存推入副主餐置入table
  const bangdongSoloEditBentoMainCompositions = []
  for (const bangdongSoloEditBentoMain of bangdongSoloEditBentoMains) {
    if (bangdongSoloEditBentoMain.quantity > 0) {
      const bangdongSoloEditBentoMainComposition = `${bangdongSoloEditBentoMain.name} x${bangdongSoloEditBentoMain.quantity}`
      bangdongSoloEditBentoMainCompositions.push(bangdongSoloEditBentoMainComposition)
      // console.log(bangdongSoloEditBentoMainComposition)
      // 保留副主餐名稱、ID
      const productInput = {
        productTypeName: bangdongSoloBentoMainName.value,
        productTypeId: bangdongSoloBentoMainId.value,
        productType: 'options_with_qty'
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdongSoloEditBentoMain.name,
        price: bangdongSoloEditBentoMain.price,
        value: parseInt(bangdongSoloEditBentoMain.quantity),
        totalPrice: row.price
      }
      row.inputs.push(input)

      bangdongSoloEditBentoMain.quantity = 0
    }
  }

  if (bangdongSoloEditSideDishCompositions.length > 0) {
    row.sideDishes += `配菜 (${bangdongSoloEditSideDishCompositions.join(', ')})`
  }

  if (bangdongSoloEditBentoMainCompositions.length > 0) {
    if (bangdongSoloEditSideDishCompositions.length > 0) {
      row.sideDishes += ', '
    }
    row.sideDishes += `副主餐 (${bangdongSoloEditBentoMainCompositions.join(', ')})`
  }
  row.name = bangdongSoloEditName.value + totalQuantity + '份'

  // 購物袋
  const ecoBagCompositions = []
  for (const bangdongSoloEditEcoBag of bangdongSoloEditEcoBags) {
    if (bangdongSoloEditEcoBag.quantity > 0) {
      const ecoBagComposition = `${bangdongSoloEditEcoBag.name} x${bangdongSoloEditEcoBag.quantity}`
      ecoBagCompositions.push(ecoBagComposition)
      // 保留購物袋名稱、ID
      const productInput = {
        productTypeName: bangdongSoloEcoBagName.value,
        productTypeId: bangdongSoloEcoBagId.value
      }
      row.productInputs.push(productInput)
      const input = {
        name: bangdongSoloEditEcoBag.name,
        price: bangdongSoloEditEcoBag.price,
        value: parseInt(bangdongSoloEditEcoBag.quantity)
      }
      row.inputs.push(input)
      bangdongSoloEditEcoBag.quantity = 0
    }
  }

  if (ecoBagCompositions.length > 0) {
    row.name += ` (${ecoBagCompositions.join(', ')})`
  }
  const productInput = {
    id: bangdongSoloProductId.value,
    name: bangdongSoloName.value,
    value: parseInt(totalQuantity),
    totalPrice: bangdongSoloTotalQuantityPrice.value
  }
  row.productInputs.push(productInput)
  // 將這個 row 推進 tableRows 中
  const rowIndex = tableRows.findIndex(r => r === editingRow)
  if (rowIndex !== -1) {
    tableRows.splice(rowIndex, 1, row) // 在移除元素的同時插入新元素
  }
  editDialog10.value = false
}
// -------------------------------------------------------------------------

// 盒餐開關
const showlunchBox = ref(false)

// 是否已經抓取過招牌便當資料的狀態變數
const isLunchBox1Loaded = ref(false)
const isLunchBox2Loaded = ref(false)
const isLunchBox3Loaded = ref(false)
const isLunchBox4Loaded = ref(false)

const openlunchBox = () => {
  showlunchBox.value = true
  if (!isLunchBox1Loaded.value) {
    loadLunchBox1()
    loadLunchBox1Edit()
    isLunchBox1Loaded.value = true
  }
  if (!isLunchBox2Loaded.value) {
    loadLunchBox2()
    loadLunchBox2Edit()
    isLunchBox2Loaded.value = true
  }
  if (!isLunchBox3Loaded.value) {
    loadLunchBox3()
    loadLunchBox3Edit()
    isLunchBox3Loaded.value = true
  }
  if (!isLunchBox4Loaded.value) {
    loadLunchBox4()
    loadLunchBox4Edit()
    isLunchBox4Loaded.value = true
  }
// 其他邏輯...
}

const showlunchBox1 = ref(false)
const showlunchBox2 = ref(false)
const showlunchBox3 = ref(false)
const showlunchBox4 = ref(false)
const showbangdong1 = ref(false)
const showbangdong2 = ref(false)
const showbangdong3 = ref(false)
const showbangdong4 = ref(false)
const showbangdongVegetarian1 = ref(false)
const showbangdongVegetarian2 = ref(false)
// 單點開關
const showbangdongSolo = ref(false)

const isBangdongSoloLoaded = ref(false)

const opensolo = () => {
  showbangdongSolo.value = true
  if (!isBangdongSoloLoaded.value) {
    loadBangdongSolo()
    loadBangdongSoloEdit()
    isBangdongSoloLoaded.value = true
  }
}

// 客製便當開關
const showbangdongCustom1 = ref(false)

const isBangdongCustom1Loaded = ref(false)

const openCustomBangdong = () => {
  showbangdongCustom1.value = true

  if (!isBangdongCustom1Loaded.value) {
    loadBangdongCustom1()
    loadBangdongCustom1Edit()
    isBangdongCustom1Loaded.value = true
  }
}

// 客製餐盒開關
const showLunchBoxCustom1 = ref(false)

const isLunchBoxCustom1Loaded = ref(false)
const openCustomLunchBox = () => {
  showLunchBoxCustom1.value = true

  if (!isLunchBoxCustom1Loaded.value) {
    loadLunchBoxCustom1()
    loadLunchBoxCustom1Edit()
    isLunchBoxCustom1Loaded.value = true
  }
}

const isSubmitting = ref(false)
const addOrder = async () => {
  if (!personForm.pick) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇送達方式'
    })
    return
  }
  if (!personForm.getDate) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇送達日期'
    })
    return
  }
  if (!personForm.time) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請輸入送達時間範圍'
    })
    return
  }
  if (!personForm.noCompilation) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇是否需要統編'
    })
    return
  }
  if (personForm.orderStatu === '請選擇') {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: '請選擇訂單狀態'
    })
    return
  }
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  try {
    // 導入資料縣市
    let cities = []
    let stateId = ''
    let address2Id = ''

    if (personForm.address) {
      const states = await apiAuth.get('localization/division/state')
      const state = states.data.find(s => s.name === personForm.address)
      stateId = state ? state.id : ''
      console.log(stateId)
      // 介面上顯示原本的地址名稱
      personForm.address = state.name

      await new Promise(resolve => setTimeout(resolve, 100))

      if (state) {
        cities = await apiAuth.get(`localization/division/city?filter_parent_id=${state.id}`)
        const city = cities.data.find(c => c.name === personForm.address2)
        address2Id = city ? city.city_id : ''
        console.log(address2Id)
        // 介面上顯示原本的地址名稱
        personForm.address2 = city.name
      }
    }

    // 其他情况下填入空值
    if (!personForm.address || !stateId) {
      stateId = ''
      address2Id = ''
    }

    const formData = new FormData()

    const checkDate = personForm.checkDate
    const dateParts = checkDate.split('/')
    const year = dateParts[0]
    const month = dateParts[1]
    const day = dateParts[2]
    const formattedDate = year + '-' + month + '-' + day

    const checkDate2 = personForm.getDate
    const dateParts2 = checkDate2.split('/')
    const year2 = dateParts2[0]
    const month2 = dateParts2[1]
    const day2 = dateParts2[2]
    const formattedDate2 = year2 + '-' + month2 + '-' + day2

    const checkDate3 = getMoneyDate.value
    const dateParts3 = checkDate3 ? checkDate3.split('/') : [] // 檢查是否為空值
    const year3 = dateParts3.length > 0 ? dateParts3[0] : ''
    const month3 = dateParts3.length > 1 ? dateParts3[1] : ''
    const day3 = dateParts3.length > 2 ? dateParts3[2] : ''
    const formattedDate3 = year3 && month3 && day3 ? year3 + '-' + month3 + '-' + day3 : '' // 確保所有日期部分都存在才組成日期字串

    const pickMethod = computed(() => {
      if (personForm.pick === '自取') {
        return 'shipping_pickup'
      } else if (personForm.pick === '派送') {
        return 'shipping_delivery'
      } else {
        return ''
      }
    })
    const statusId = computed(() => {
      if (personForm.orderStatu === '未確認') {
        return 101
      } else if (personForm.orderStatu === '已確認') {
        return 103
      } else if (personForm.orderStatu === '已確待配') {
        return 116
      } else if (personForm.orderStatu === '未結清') {
        return 117
      } else if (personForm.orderStatu === '已結案') {
        return 118
      } else if (personForm.orderStatu === '作廢') {
        return 115
      } else {
        return ''
      }
    })

    if (personForm.prefix == null) {
      personForm.prefix = ''
    }
    if (personForm.hometel2 == null) {
      personForm.hometel2 = ''
    }
    if (personForm.hometel == null) {
      personForm.hometel = ''
    }

    const locationIdValue = computed(() => {
      if (personForm.locationId === '重慶南') {
        return 1
      } else if (personForm.locationId === '和平') {
        return 2
      } else {
        return 1
      }
    })
    // 添加基本的訂單信息
    formData.append('order_id', '')// 訂單編號
    formData.append('customer_id', personForm.memberId)// 訂購人編號
    // formData.append('status_id', 116)// 訂單狀態
    formData.append('order_date', formattedDate)// 訂購日期
    formData.append('shipping_method', pickMethod.value)// 取貨方式
    formData.append('delivery_date_ymd', formattedDate2)// 送達日
    formData.append('delivery_date_hi', personForm.time.replace(':', '').substring(0, 4))// 送達時間
    formData.append('delivery_time_range', personForm.time)// 送達時間範圍
    formData.append('shipping_road_abbr', personForm.road)// 送達路段
    formData.append('personal_name', personForm.name) // 訂購人姓名
    formData.append('salutation_id', personForm.gender) // 稱謂(即性別，先生/小姐)
    formData.append('mobile', personForm.tel)// 訂購人手機
    formData.append('telephone_prefix', personForm.prefix) // 區碼
    formData.append('telephone', personForm.hometel + '#' + personForm.hometel2) // 訂購人電話
    // formData.append('getReturn', 1) // 測試
    // formData.append('email', personForm.email) // 訂購人信箱
    formData.append('payment_company', personForm.company) // 訂購公司
    formData.append('payment_tin', personForm.compilation) // 統一編號
    formData.append('is_payment_tin', personForm.noCompilation ? 0 : 1) // 是否需要統編
    formData.append('payment_method', paymentMethod.value) //  付款方式
    formData.append('scheduled_payment_date', formattedDate3) // 付款日期
    formData.append('payment_total', total.value) //  總金額
    formData.append('payment_total', paid.value) //  付款金額
    formData.append('payment_unpaid', unpaid.value) //  未付餘額
    formData.append('order_tags', personForm.event) //  訂單標籤
    formData.append('shipping_personal_name', personForm.recipient) //  personForm.recipient
    formData.append('shipping_state_id', stateId || '') //  縣市代號
    formData.append('shipping_city_id', address2Id || '') //  鄉鎮市區代號
    formData.append('shipping_road', personForm.road || '') //  送達地址
    formData.append('shipping_address1', personForm.road2 || '') //  送達地址
    formData.append('payment_company', personForm.getCompany) //  收件公司
    formData.append('shipping_phone', personForm.recipientTel) //  收件人電話
    formData.append('comment', personForm.remark) //  客戶備註
    formData.append('extra_comment', mealRemark.value) //  餐點備註
    formData.append('status_id', statusId.value) // 設定訂單狀態
    formData.append('location_id', locationIdValue.value) // 設定訂單狀態

    formData.append('order_totals[sub_total][title]', '商品合計') // 商品合計
    formData.append('order_totals[sub_total][value]', productPrice.value)
    // formData.append('order_totals[sub_total][sort_order]', 1)
    formData.append('order_totals[discount][title]', '優惠折扣') // 優惠折扣
    formData.append('order_totals[discount][value]', discount.value)
    // formData.append('order_totals[discount][sort_order]', 2)
    formData.append('order_totals[shipping_fee][title]', '運費') // 運費
    formData.append('order_totals[shipping_fee][value]', freight.value)
    // formData.append('order_totals[shipping_fee][sort_order]', 3)
    formData.append('order_totals[total ][title]', '總計') // 總計
    formData.append('order_totals[total ][value]', total.value)
    // formData.append('order_totals[total ][sort_order]', 4)

    // 添加訂單產品
    for (const row of tableRows) {
      for (const productInput of row.productInputs) {
        if (Object.prototype.hasOwnProperty.call(productInput, 'name')) {
          formData.append(`order_products[${row.id}][product_id]`, productInput.id)
          formData.append(`order_products[${row.id}][name]`, productInput.name)
          formData.append(`order_products[${row.id}][quantity]`, productInput.value)
          formData.append(`order_products[${row.id}][price]`, productInput.price)
          formData.append(`order_products[${row.id}][total]`, productInput.totalPrice)
          formData.append(`order_products[${row.id}][final_total]`, productInput.totalPrice)
        }
      }

      let productOptionIndex = 1
      for (const productInput of row.productInputs) {
        if (
          typeof productInput.productTypeId !== 'undefined' &&
    typeof productInput.productType !== 'undefined' &&
    typeof productInput.productTypeName !== 'undefined'
        ) {
          formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][product_option_id]`, productInput.productTypeId)
          formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][type]`, productInput.productType)
          formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][name]`, productInput.productTypeName)

          let productOptionValueIndex = 1
          for (const input of row.inputs) {
            if (input.mainId === productInput.mainId) {
              formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][product_option_value_id]`, input.id)
              formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][value]`, input.name)
              formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][quantity]`, input.value)
              if (input.mainId) {
                formData.append(`order_products[${row.id}][product_options][${productOptionIndex}][product_option_values][${productOptionValueIndex}][parent_povid]`, input.mainId)
              }

              productOptionValueIndex++
            }
          }

          productOptionIndex++
        }
      }
    }
    // 發送訂單到API
    const response = await apiAuth.post('sale/order/save', formData)
    console.log(response.data)
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'check-circle',
      position: 'center',
      message: '已成功加入訂單'
    })
    // 清空 tableRows
    tableRows.splice(0, tableRows.length)
    onReset()
    getMoneyDate.value = ''
    paid.value = 0
    freight.value = 0
    discount.value = 0
    mealRemark.value = ''
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      position: 'center',
      message: 'An error occurred: ' + error.message
    })
  } finally {
    isSubmitting.value = false
  }
}

</script >

  <style lang="scss" scoped>
  .mainMenu{
  text-align: center;
   position: relative;
    top: 50%;
    transform: translate(0, 20%);
  width: 100vw;

  .q-btn{
  width: 300px;
  height: 300px;
  margin: 20px;
  margin-top: 50px;
  font-size: 50px!important;
  }
  }
  .orderMenucontainer{
    height: 950px;
  }

  .container {
    background-color: rgba(0, 0, 0, 0.8);
    border-radius: 3px;
    width: 1280px;
    height: 1024px;

  }
  .nav{
    display: flex!important;
    justify-content: space-around!important;
  }
  .nav button{
    width: 176px;
    height: 176px;
    background: #477DE7;
    color: #FFFFFF;
    font-size: 28px;
    box-shadow: 10px 10px 0px 2px #1564ad;

  }

  .menu{
    // margin-top: 10px;
    // margin-left: 30px;
    height: 85px;
    margin:24px 30px 0 5px ;
    text-align: center;
    h5{
      font-size: 23px;
    }
    // position: relative;
    // top: 50%;
    // transform: translate(0, -50%);
    .q-btn{
      width: 140px;
    height: 40px;
    background: #477DE7;
    color: #FFFFFF;
    margin: 9px;
    margin-top: 6px;
    /* margin-top: 20px; */
    font-size: 27px;
    box-shadow: 7px 5px 0px 2px #1564ad;
    }
    .personBtn{
      width: 140px;
    }

  }
  .menu .card-body {
    cursor: pointer;
  }

  .menu .card:hover {
    box-shadow: 0px 0px 10px 1px rgba(255,255,255,0.8);
  }

  #cancel{
    box-shadow: 10px 10px 0px 0px #f94633;

  }

  .row {
    max-height: 700px;
  }

  .slider {
    height: 100%;
    width: 1260px;
    overflow-y: auto;
    background: #dadde0;
    // margin: 10px;
    margin-top: 5px;

     th{
      font-size: 20px!important;
     }
  }

  #sliderTable{
    height: 100%;
    td {
      white-space: normal;
    }
    .q-table__middle{
          th{
      font-size: 2rem!important;
     }
    }
    }

  #fine{

    background: rgb(19 207 107);
    color: #FFFFFF;
    /* margin-top: 20px; */

  }

  .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 173%;
      height: 920px;
      background-color: #fff;
      background-clip: padding-box;
      border: 1px solid rgba(0,0,0,.2);
      border-radius: 0.3rem;
      outline: 0;
  }

  .bandongbtn{
    width: 300px;
  height: 270px;
    background: #477DE7;
    color: #FFFFFF;
    margin: 52px;
    /* margin-top: 20px; */
    font-size: 40px;
    box-shadow: 10px 10px 0px 2px #1564ad;

  }

  .bangdongFooterBtn{
      background: red;
      width: 120px;
      height: 66px;
      font-size: 27px;
      color: #FFFFFF;
  }
  .person{
    height: 580px;
    width:100%;
    margin:0 5px;
    .person-form{
      width: 100%;
    }

  }

  // #lunchbox1{
  //   display: flex;
  //   align-content:flex-start;
  //   flex-wrap:wrap;
  // }

  #bangdongcard{
    width: 100%!important;
    max-height: 640px;
    display: flex;
    align-content:flex-start;
    flex-wrap:wrap;
    .q-input{
      margin-top: 10px;
    }

  }

  #customBangdongcard{
    width: 100%!important;
    height: 720px;
    h5{
      line-height: 0;
    }
    .q-input{
      margin-top: 10px;
    }

  }
  #dialogbtnCard{
    width: 650px!important;
    height: 700px;
    overflow-x: hidden;
    .q-input{
      margin-top: 10px;
    }

  }
  #dialogbtnBangdongCard{
    width: 650px!important;
    height: 700px;
    overflow-x: hidden;
    .q-input{
      margin-top: 10px;
    }

  }
  #solocard{
    width: 100%!important;
    max-height: 900px;
    // overflow: hidden;
    display: flex;
    overflow-wrap: break-word;
    .q-input{
      margin-top: 3px;
    }

  }

  .q-dialog__inner--minimized > div {
      max-width: 1270px;
      max-height: 1000px;
  }

  // .q-dialog--inner--minimized > div[data-v-11ce7a88] {
  //     max-width: 1180px;
  // }

  table,table td,table th{
    border:1px solid #0c0c0c;
    border-collapse:collapse;
    // width: 157.7px;
    padding: 7px;
    }
    table{
      height: 314px;

    }
    #lunchbox{
      max-height: 900px;
      .h{
        font-size: 20px;
      }
      h5{
      line-height: 0;
    }
    }
    #customLunchbox{
      max-height: 900px;
      .h{
        font-size: 20px;
      }
      h5{
      line-height: 0;
    }
    }

    #lunchboxbtn{
      width: 657px!important;
      height: 600px;
      .q-btn{
      width: 260px;
      height: 260px;
      margin: 34px;
      // margin-top: 50px;
      font-size: 50px;
      }

    }
    #bangdongbtn{
      width: 657px!important;
      height: 600px;
      .q-btn{
      width: 260px;
      height: 130px;
      margin: 34px;
      // margin-top: 50px;
      font-size: 30px;
      }

    }

    .custom-dropdown {
    width: 2px;
  }

  .radio-option {
    font-size: 20px;
  }
  .radio-option .q-radio__label {
    font-size: 20px;
  }

  .tableMember{
    p{
      margin-right: 20px
    }
  }
  </style>
