<template>
  <div class="Deal">
    <div class="Deal-hearder">
      <img src="./img/hearder01.png" alt="" @click="dialogVisible = true" />
      <div>
        <ul>
          <li class="Deal-li">
            <div class="div1">
              <img src="./img/编组 90.png" alt="" />
            </div>
            <div class="div2">
              <p>一手价格</p>
              <p>比90%的同行价格低</p>
            </div>
          </li>
          <li class="Deal-li">
            <div class="div1">
              <img src="./img/订单_order (1).png" alt="" />
            </div>
            <div class="div2">
              <p>上帖更快</p>
              <p>最快当天即可上贴</p>
            </div>
          </li>
          <li class="Deal-li">
            <div class="div1">
              <img src="./img/路径.png" alt="" />
            </div>
            <div class="div2">
              <p>效果可追踪</p>
              <p>自动追踪产品促销数据</p>
            </div>
          </li>
          <li class="Deal-li">
            <div class="div1">
              <img src="./img/团队.png" alt="" />
            </div>
            <div class="div2">
              <p>服务有保障</p>
              <p>量身制定推广方案和策略</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="DealBanxin">
      <div class="DealWZ1">VIPON精准站外促销</div>

      <div class="Deal-top1">
        <div>
          <img src="./img/编组 71.png" alt="" />
        </div>
        <div>
          <p class="p1">亚马逊站外促销平台TOP1</p>
          <p class="p2">高效解决卖家推新品、打爆款、清库存、促排</p>
          <ul class="ul1">
            <li>
              <p>300W+</p>
              <p>真实买家</p>
            </li>
            <li>
              <p>10W+</p>
              <p>日均UV</p>
            </li>
            <li>
              <p>55W+</p>
              <p>日均PV</p>
            </li>
            <li>
              <p>2700W+</p>
              <p>年均领码</p>
            </li>
          </ul>
          <ul class="ul2">
            <li>
              <img src="./img/赞_thumbs-up.png" alt="" />
              <span>门槛低见效快</span>
            </li>
            <li>
              <img src="./img/编组 105.png" alt="" />
              <span>性价比高</span>
            </li>
            <li>
              <img src="./img/保护_protect.png" alt="" />
              <span>安全合规</span>
            </li>
            <li>
              <img src="./img/订单_order.png" alt="" />
              <span>自助发帖</span>
            </li>
            <li>
              <img src="./img/喜欢_like.png" alt="" />
              <span>对中国卖家极为友好</span>
            </li>
          </ul>
          <button @click="goLogin">点击了解更多</button>
        </div>
      </div>

      <div class="DealWZ1">美国热门Deal站推广服务</div>

      <div id="carousel">
        <ul class="carousel-ul">
          <li
            v-for="(item, index) in carouselUl"
            :key="index"
            ref="carouselUl"
            @click="carouselUlClick(index)"
            @mouseover="handleMouseOver(index)"
          >
            {{ item }}
          </li>
        </ul>
        <ul
          id="imgList"
          @mouseover="handleMouseOverStro()"
          @mouseout="handleMouseOverOut()"
        >
          <div ref="imglistDom" class="imgList-div">
            <li>
              <div class="Techbargains1">
                <p class="p1">Techbargains</p>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>月均流量约200W+，用户相当精准，网站类目较全；</p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>支持亚马逊、沃尔玛Deal贴；</p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    适合促销品类：3C电子类产品、home家居类产品, 如灯具类,
                    小家电类产品等，另外有些户外的产品表现效果也不错。
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
              <div class="Techbargains2">
                <img src="./img/panel4.png" alt="" />
              </div>
            </li>
            <li>
              <div class="BensBargains2">
                <img src="./img/panel3.png" alt="" />
              </div>
              <div class="BensBargains1">
                <p class="p1">Ben's Bargains</p>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>
                    月均流量约300万+，其中92%以上为男性，对男性用户产品定位精准；
                  </p>
                </div>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>
                    适合促销品类：①
                    电子数码产品，如：高端游戏机、机械键盘、高品质耳机、手机配件、外壳和充电器等；②
                    为男性特别定制的球鞋、服饰、手表等；③
                    家具类目，包括需要安装的游戏桌、电竞椅等；④ 工具五金类目；⑤
                    户外装备类目。
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
            </li>
            <li>
              <div class="Techbargains1">
                <p class="p1">slickdeals</p>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    是美国目前最大的折扣站，也是亚马逊最大的站外引荐流量来源，每月访问量在4500万+；
                    对listing fakespot等级及review星级无特殊要求;
                  </p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    适合：① 有一定业务体量和品牌意识的精品卖家；②
                    需要解决推新产品前的曝光不足问题；③
                    愿意配合我们跟编辑沟通配合的卖家；
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
              <div class="Techbargains2">
                <img src="./img/panel7.png" alt="" />
              </div>
            </li>
            <li>
              <div class="BensBargains2">
                <img src="./img/panel2.png" alt="" />
              </div>
              <div class="BensBargains1">
                <p class="p1">Dealnews</p>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>月均流量约830万-1200W+，美国第二大的deal站；</p>
                </div>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>
                    大量精准流量，能快速的提升产品销量，DealNews对于新品推广、日常或大促季节，清仓处理有着极大的帮助;
                  </p>
                </div>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>支持亚马逊、EBay、沃尔玛、Macy、独立站等Deal贴；</p>
                </div>
                <div class="BensBargains1-div">
                  <div class="BensBargains1-div1">
                    <div class="BensBargains1-div2"></div>
                  </div>
                  <p>
                    适合品类：服装，电脑，电子产品，家居，其中家居类出单效果较好;
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
            </li>
            <li>
              <div class="Techbargains1">
                <p class="p1">1 Sale</p>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    月均流量约100W+,流量比较稳定，美国老牌促销网站；相比DealNews名气不大，但是性价比较高；
                  </p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    适合促销品类：①
                    电子产品类，如吸尘器，台灯，健身单车，投影仪，摄像头等高货值产品；②
                    家居类，如榨汁机，厨房餐具，水壶，锅具，烤箱，风扇等；③
                    时尚首饰类，如服装，手套，袜子，饰品等。
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
              <div class="Techbargains2">
                <img src="./img/panel5.png" alt="" />
              </div>
            </li>
            <li>
              <div class="Techbargains1">
                <p class="p1">FB促销群组</p>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>买家用户约90%都是女性，且以25岁以上家庭主妇、宝妈为主；</p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    不少FB红人博主自身也是宝妈，对于自身相关产品她们会有更强的倾向，这类产品通常上贴和爆单概率较大；
                  </p>
                </div>
                <div class="Techbargains1-div">
                  <div class="Techbargains1-div1">
                    <div class="Techbargains1-div2"></div>
                  </div>
                  <p>
                    重点推荐类目：母婴类或儿童玩具类、家居和厨房类、宠物类。
                  </p>
                </div>

                <button @click="goVipon">点击了解更多</button>
              </div>
              <div class="Techbargains2">
                <img src="./img/panel6.png" alt="" />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <div class="Deal-top2">
      <div class="DealTop2Banxin">
        <div class="DealWZ1">自动追踪促销效果</div>
        <p class="p1">
          发帖后自动追踪产品促销出单数量及金额，以及排名变化趋势，促销结束后，持续免费追踪
        </p>

        <div class="Dealtop2-dev">
          <div class="Dealtop2Dev-left">
            <div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div>
              <img
                src="./img/promotion.gif"
                style="width: 100%; height: 100%"
              />
            </div>
          </div>
          <div class="Dealtop2Dev-right">
            <div class="Dealtop2DevRight-div">
              <img
                src="./img/形状.png"
                style="width: 42px; height: 28px; margin: 27px 0 0 230px"
              />
            </div>
            <ul>
              <li>
                <img src="./img/lujin.png" />
                <span>产品排名变化追踪</span>
              </li>
              <li>
                <img src="./img/lujin.png" />
                <span>促销出单数量追踪</span>
              </li>
              <li>
                <img src="./img/lujin.png" />
                <span>促销出单金额追踪</span>
              </li>
              <li>
                <img src="./img/lujin.png" />
                <span>推广渠道效果对比</span>
              </li>
              <li>
                <img src="./img/lujin.png" />
                <span>推广产品效果对比</span>
              </li>
              <div>...</div>
            </ul>
            <button @click="goVipon">点击了解更多</button>
            <div class="Dealtop2Dev-img">
              <img
                src="./img/矩形备份 9.png"
                style="width: 100%; height: 100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Deal-top3">
      <div class="DealTop3Banxin">
        <p>我们的优势</p>
        <ul>
          <li>
            <div>
              <img src="./img/tuandui.png" />
              <div>
                <img src="./img/right.png" alt="" />
              </div>
            </div>
            <div>一手价格</div>
            <div></div>
            <div>官方渠道长期合作，报价低于市面上90%以上同类服务</div>
          </li>
          <li>
            <div>
              <img src="./img/编组 5.png" />
              <div>
                <img src="./img/right.png" alt="" />
              </div>
            </div>
            <div>上贴更快、更灵活</div>
            <div></div>
            <div>直接对接官方编辑，最快当天即可上贴，产品审核更易通过</div>
          </li>
          <li>
            <div>
              <img src="./img/服务.png" />
              <div>
                <img src="./img/right.png" alt="" />
              </div>
            </div>
            <div>效果可追踪</div>
            <div></div>
            <div>发帖后自动追踪产品促销出单数量及金额，以及排名变化趋势</div>
          </li>
          <li>
            <div>
              <img src="./img/流量.png" />
              <div>
                <img src="./img/right.png" alt="" />
              </div>
            </div>
            <div>务有保障</div>
            <div></div>
            <div>
              以客为先，诚信经营，跨境专家团队，为您量身制定推广方案和策略
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="Deal-top4">
      <div class="DealWZ1">成功案例</div>
      <div class="DealTop4Banxin">
        <div class="DealTop4Banxin-TOP">
          <div class="DealTop4BanxinTOP-div">
            <div>
              <img src="./img/successful_cases1.png" alt="" />
              <p>陈总</p>
            </div>
            <div>
              <p>清库存</p>
              <p>
                有个上线两年多的高客单产品，因推广经验不足，现在已经卖不动了，终于还是决定清仓。听朋友介绍找了updeal平台，做了dealnews首页秒杀广告，没想到，第一次就出单400+，解决了资金回拢问题
              </p>
              <p>——杭州XX网络科技有限公司</p>
            </div>
          </div>
          <div class="DealTop4BanxinTOP-div">
            <div>
              <img src="./img/successful_cases2.png" alt="" />
              <p>陈总</p>
            </div>
            <div>
              <p>激活销量</p>
              <p>
                因为一次备货失误，我们的listing断了近一个月的货，排名一落千丈，从每天近百个出单到每天零星出单。一次偶然机会了解到了updeal平台，通过VIPON的首页广告位连续几天推广，在高曝光的帮助下，再次激活了listing。
              </p>
              <p>——深圳XX科技有限公司</p>
            </div>
          </div>
        </div>
        <div class="DealTop4Banxin-TOP">
          <div class="DealTop4BanxinTOP-div">
            <div>
              <img src="./img/successful_cases3.png" alt="" />
              <p>胡X君</p>
            </div>
            <div>
              <p>新品冲排名</p>
              <p>
                开店半年，新品销量排名一直起不来，cpc广告也烧不出单，了解到站外推广平台updeal，购买了套餐，在使用半个月且通过和站内广告的结合，产品销量排名慢慢的往前靠，终于不断的有自然订单。
              </p>
              <p>——亚马逊个人创业者</p>
            </div>
          </div>
          <div class="DealTop4BanxinTOP-div">
            <div>
              <img src="./img/successful_cases4.png" alt="" />
              <p>黄总</p>
            </div>
            <div>
              <p>增加关联流量</p>
              <p>
                开店一年左右，精品路线，小类排名前100，每天单量还不错，想冲爆款，但站内流量有限订单没有大的突破，最后找到了updeal平台，通过多渠道组合式的推广，最终单量暴涨，持续推广几天后，排名成功推到小类Bestseller。
              </p>
              <p>——厦门市XX贸易有限公司</p>
            </div>
          </div>
        </div>
        <button @click="goHome">更多案例</button>
      </div>
    </div>
    <div class="Deal-top5">
      <div class="DealTop5Banxin">
        <div class="DealTop5-left">
          <p>关于我们</p>
          <p></p>
          <p>
            百佬汇跨境电商（深圳）有限公司成立于2015年，总部位于深圳，是上市公司全资子公司，
            A股代码
            （002098）。我们为亚马逊卖家提供从选品到售后一站式解决方案，拥有全球最大的亚马逊折扣促销平台，坐拥超300万精准买家。
            公司自成立以来全球累计服务亚马逊卖家超50万，其中包括多家年销售额超过50亿的大卖，拥有多年国内及海外亚马逊实战经验的技术及运营管理团队，提供一对一专业售后服务。我们始终坚守以客户为中心，以终为始，助力卖家并与卖家共同成长。
          </p>
        </div>
        <div class="DealTop5-rigthg">
          <img src="./img/编组 78.png" alt="" />
        </div>
      </div>
    </div>
    <div class="Deal-top6">
      <div class="DealWZ1">超50万+亚马逊卖家的共同选择</div>
      <p class="p1">
        公司自成立以来全球累积服务超50万亚马逊卖家，客户包括傲基，通拓，泽宝，南孚，赛维，价之链，百事泰，亚飞等大卖
      </p>
    </div>
    <div class="Deal-top7">
      <div class="DealTop7-div">
        <ul ref="DealTop7Ul">
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 25.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 26.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 27.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 28.png" alt="" />
          </li>
          <li>
            <img src="./img/骆驼.png" alt="" />
          </li>
          <li>
            <img src="./img/帕拓逊.png" alt="" />
          </li>
          <li>
            <img src="./img/位图.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 25.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 26.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 27.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 28.png" alt="" />
          </li>
          <li>
            <img src="./img/骆驼.png" alt="" />
          </li>
          <li>
            <img src="./img/帕拓逊.png" alt="" />
          </li>
          <li>
            <img src="./img/位图.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 25.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 26.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 27.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 28.png" alt="" />
          </li>
          <li>
            <img src="./img/骆驼.png" alt="" />
          </li>
          <li>
            <img src="./img/帕拓逊.png" alt="" />
          </li>
          <li>
            <img src="./img/位图.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 25.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 26.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 27.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 28.png" alt="" />
          </li>
          <li>
            <img src="./img/骆驼.png" alt="" />
          </li>
          <li>
            <img src="./img/帕拓逊.png" alt="" />
          </li>
          <li>
            <img src="./img/位图.png" alt="" />
          </li>
        </ul>
        <ul ref="DealTop7Ul2">
          <li>
            <img src="./img/TOMTOP.png" alt="" />
          </li>
          <li>
            <img src="./img/weitu2.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 36.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 32.png" alt="" />
          </li>
          <li>
            <img src="./img/TOMTOP.png" alt="" />
          </li>
          <li>
            <img src="./img/weitu2.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 36.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 32.png" alt="" />
          </li>
          <li>
            <img src="./img/TOMTOP.png" alt="" />
          </li>
          <li>
            <img src="./img/weitu2.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 36.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 32.png" alt="" />
          </li>
          <li>
            <img src="./img/TOMTOP.png" alt="" />
          </li>
          <li>
            <img src="./img/weitu2.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 36.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 32.png" alt="" />
          </li>
          <li>
            <img src="./img/TOMTOP.png" alt="" />
          </li>
          <li>
            <img src="./img/weitu2.png" alt="" />
          </li>
          <li>
            <img src="./img/宝视佳.png" alt="" />
          </li>
          <li>
            <img src="./img/编组.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 36.png" alt="" />
          </li>
          <li>
            <img src="./img/编组 32.png" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <div class="Deal-top8">
      <ul>
        <li>
          <div></div>
          <span @click="goVIPON">VIPON站外促销</span>
        </li>
        <li>
          <div></div>
          <span>关于我们</span>
        </li>
        <li>
          <div></div>
          <span @click="dialogVisible = true">联系我们</span>
        </li>
      </ul>
      <p class="p1">
        免责声明: testagent.myvipon.com 的经营者与 amazon.com
        没有隶属关系并且没有接受来自 amazon.com 的任何资金支持,此网站及其内容归
        testagent.myvipon.com 所有。
      </p>
      <p class="p2">
        © 2023.百佬汇跨境电商（深圳）有限公司版权所有
        <span @click="goICP">粤ICP备16035415号</span>
      </p>
    </div>

    <div class="box" @mouseover="mouseoverbox" @mouseout="mouseoutbox">
      <img src="./img/fixed_icon.png" alt="" />
    </div>
    <div class="boxs" v-show="Vshow">
      <img
        src="./img/8e39d5b4190eee58fabb93038ecb40d0.jpg"
        style="width: 100x; height: 100px; margin: 10px auto; display: block"
      />
      <p>扫码添加客服</p>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="15%">
      <img
        src="./img/8e39d5b4190eee58fabb93038ecb40d0.jpg"
        style="width: 180x; height: 180px; margin: 0 auto; display: block"
      />
      <p
        style="
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          text-align: center;
          margin-top: 10px;
        "
      >
        扫描二维码联系我们
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_box: "",
      carouselUl: [
        "Techbargains",
        "Ben's Bargains",
        "slickdeals",
        "DealNews",
        "1 Sale",
        "FB群组",
      ],
      index: 0,
      timer: null,
      flag: 0,
      timefor: null,
      num: 0,
      num2: -120,
      dialogVisible: false,
      Vshow: false,
      ViponSrc: "",
    };
  },
  mounted() {
    this.img_box = this.$refs.imglistDom;

    this.$refs.carouselUl[this.index].style.color = "#3370FF";
    this.$refs.carouselUl[this.index].style.borderBottom = "4px solid #3370FF";
    this.timerfor();
    this.DealTop7ul();
    this.DealTop7Ul2();
  },
  methods: {
    carouselUlClick(index) {
      this.index = index - 1;
      this.throttle(index);
    },
    handleMouseOverStro() {
      clearInterval(this.timefor);
      clearTimeout(this.timer);
    },
    handleMouseOverOut() {
      this.timerfor(this.index);
    },

    handleMouseOver(index) {
      clearInterval(this.timefor);
      clearTimeout(this.timer);
      if (this.flag == 0) {
        this.flag = 1;
        this.timer = setTimeout(() => {
          this.index = index - 1;
          this.throttle(index);
          this.timerfor();
        }, 500);
        this.flag = 0;
      }
    },
    throttle(index) {
      this.img_box.style.transition = "0.5s";
      this.img_box.style.left = -index * 1200 + "px";
      this.$refs.carouselUl.forEach((item) => {
        item.style.color = "#333333";
        item.style.borderBottom = "";
      });
      this.$refs.carouselUl[index].style.color = "#3370FF";
      this.$refs.carouselUl[index].style.borderBottom = "4px solid #3370FF";
    },
    timerfor() {
      this.timefor = setInterval(() => {
        this.index++;
        this.throttle(this.index);
        if (this.index >= 5) {
          this.index = -1;
        }
      }, 2000);
    },
    DealTop7ul() {
      setInterval(() => {
        this.num--;
        if (this.num == -2300) {
          this.num = 0;
        }
        this.$refs.DealTop7Ul.style.left = this.num + "px";
      }, 20);
    },
    DealTop7Ul2() {
      setInterval(() => {
        this.num2--;
        if (this.num2 == -2300) {
          this.num2 = 0;
        }
        this.$refs.DealTop7Ul2.style.left = this.num2 + "px";
      }, 20);
    },
    mouseoverbox() {
      this.Vshow = true;
    },
    mouseoutbox() {
      this.Vshow = false;
    },
    goHome() {
      this.$router.push("/");
      window.location.href = "";
    },
    goICP() {
      window.open("https://beian.miit.gov.cn/#/Integrated/index");
    },
    goVIPON() {
      window.location.href = "";
    },
    goLogin() {
      if (localStorage.getItem("token")) {
        this.$router.push("/");
        window.location.href = "";
      } else {
        this.$router.push("/login");
      }
    },
    goVipon() {
      if (process.env.NODE_ENV == "production") {
        this.ViponSrc = "https://seller.vipona.com/dashboard/index";
      } else if (process.env.NODE_ENV == "development") {
        this.ViponSrc = "https://hkatest.myvipon.com/dashboard/index";
      }
      if (window.localStorage.getItem("token")) {
        localStorage.removeItem("source");
        localStorage.removeItem("active");
        window.location.href = this.ViponSrc;
      } else {
        window.location.href = this.ViponSrc;
      }
    },
  },
  watch: {
    index(newIndex) {
      // console.log(newIndex);
    },
  },
};
</script>
<style lang="less" scoped>
.Deal {
  width: 100%;
  .Deal-hearder {
    overflow: hidden;
    position: relative;
    img {
      display: block;
      width: 100%;
      transition: transform 0.3s ease-in-out;
    }
    img:hover {
      transform: scale(1.03);
    }
    div {
      position: absolute;
      bottom: 0px;
      width: 100%;
      ul {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .Deal-li {
          width: 285px;
          height: 108px;
          background: url(./img/img1.png) no-repeat;
          background-size: 100% 100%;
          border-radius: 10px;
          box-shadow: 0px 2px 20px 0px rgba(133, 133, 133, 0.07);
          .div1 {
            width: 58px;
            height: 58px;
            background: #3370ff;
            border-radius: 50%;
            margin-bottom: 25px;
            margin-left: 37px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 32px;
              height: 32px;
            }
          }
          .div2 {
            width: 160px;
            margin: 0 0 27px 117px;
            p:nth-child(1) {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #333333;
              margin-bottom: 4px;
            }
            p:nth-child(2) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }
  }
  .DealBanxin {
    width: 1200px;
    margin: 40px auto 0;
    .DealWZ1 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      text-align: center;
    }

    .Deal-top1 {
      width: 100%;
      height: 350px;
      margin-top: 80px;
      margin-bottom: 100px;
      display: flex;
      div:nth-child(1) {
        height: 350px;
      }
      div:nth-child(2) {
        margin-left: 27px;
        .p1 {
          font-size: 28px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          margin: 17px 0 12px;
        }
        .p2 {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          margin-bottom: 34px;
        }
        .ul1 {
          display: flex;
          width: 565px;
          justify-content: space-between;
          li {
            p:nth-child(1) {
              font-size: 36px;
              font-family: FetteMittelschrift-Regular, FetteMittelschrift;
              font-weight: 400;
              color: #333333;
            }
            p:nth-child(2) {
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              margin-top: 5px;
            }
          }
        }

        .ul2 {
          display: flex;
          margin-top: 30px;
          li {
            margin-right: 20px;
            display: flex;
            align-items: center;
            span {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              margin-left: 1px;
            }
          }
        }
        button {
          width: 177px;
          height: 36px;
          background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
          border-radius: 4px;
          border: 0;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          cursor: pointer;
          margin-top: 20px;
        }
      }
    }
    #carousel {
      height: 566px;
      width: 100%;
      margin-top: 70px;
      .carousel-ul {
        height: 46px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-content: center;
        border-bottom: 1px solid #eeeeee;
        li {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          cursor: pointer;
        }
      }

      #imgList {
        height: 460px;
        width: 100%;
        overflow: hidden;
        position: relative;
        margin-top: 60px;
        .imgList-div {
          width: 7200px;
          height: 100%;
          display: flex;
          position: absolute;
          left: 0px;
          top: 0;

          li {
            height: 460px;
            width: 100%;
            .Techbargains1 {
              width: 624px;
              height: 100%;
              float: left;
              padding: 40px 74px 0 24px;
              box-sizing: border-box;
              .p1 {
                font-size: 28px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
              }
              .Techbargains1-div {
                display: flex;
                align-items: center;
                margin-top: 30px;
                .Techbargains1-div1 {
                  width: 10px;
                  height: 10px;
                  background: rgba(#3370ff, 0.3);
                  // opacity: 0.24;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  margin-right: 10px;
                  .Techbargains1-div2 {
                    width: 4px;
                    height: 4px;
                    background: #3370ff;
                    border-radius: 50%;
                  }
                }
                p {
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  width: 500px;
                }
              }
              button {
                width: 177px;
                height: 36px;
                background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
                border-radius: 4px;
                border: none;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
                margin-top: 30px;
              }
            }
            .Techbargains2 {
              width: 576px;
              height: 368px;
              float: right;
            }
            .BensBargains2 {
              width: 576px;
              height: 368px;
              float: left;
            }

            .BensBargains1 {
              width: 604px;
              height: 100%;
              float: right;
              padding: 40px 0 0 30px;
              box-sizing: border-box;
              margin-left: 20px;
              .p1 {
                font-size: 28px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #333333;
              }
              .BensBargains1-div {
                display: flex;
                align-items: center;
                margin-top: 30px;
                .BensBargains1-div1 {
                  width: 10px;
                  height: 10px;
                  background: rgba(#3370ff, 0.3);
                  // opacity: 0.24;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  border-radius: 50%;
                  margin-right: 10px;
                  .BensBargains1-div2 {
                    width: 4px;
                    height: 4px;
                    background: #3370ff;
                    border-radius: 50%;
                  }
                }
                p {
                  font-size: 14px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #666666;
                  width: 500px;
                }
              }
              button {
                width: 177px;
                height: 36px;
                background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
                border-radius: 4px;
                border: none;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
                cursor: pointer;
                margin-top: 30px;
              }
            }
          }
        }
      }
    }
  }
  .Deal-top2 {
    height: 801px;
    width: 100%;
    background-image: url(./img/矩形.png);
    background-repeat: no-repeat;
    background-size: cover;
    .DealTop2Banxin {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      .DealWZ1 {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #333333;
        text-align: center;
        margin-top: 80px;
        margin-bottom: 24px;
      }
      .p1 {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        text-align: center;
      }
      .Dealtop2-dev {
        margin-top: 43px;
        display: flex;
        .Dealtop2Dev-left {
          div:nth-child(1) {
            width: 900px;
            height: 32px;
            background: linear-gradient(180deg, #f1f1f2 0%, #e5e5e5 100%);
            border-radius: 13px 13px 0px 0px;
            display: flex;
            align-items: center;
            div:nth-child(1) {
              width: 7px;
              height: 7px;
              background: #ff5752;
              border-radius: 50%;
              margin-left: 16px;
            }
            div:nth-child(2) {
              width: 7px;
              height: 7px;
              background: #ffa114;
              border-radius: 50%;
              margin-left: 14px;
            }
            div:nth-child(3) {
              width: 7px;
              height: 7px;
              background: #11d611;
              border-radius: 50%;
              margin-left: 14px;
            }
          }
          div:nth-child(2) {
            width: 900px;
            height: 470px;
          }
        }
        .Dealtop2Dev-right {
          width: 299px;
          height: 413px;
          background: #3370ff;
          border-radius: 0px 20px 0px 0px;
          margin-top: 65px;
          .Dealtop2DevRight-div {
            height: 28px;
          }
          ul {
            margin-top: 35px;
            li {
              display: flex;
              align-items: center;
              margin-bottom: 23px;
              span {
                font-size: 16px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #ffffff;
              }
              img {
                margin: 0 19px 0 68px;
              }
            }
            div {
              text-align: center;
              font-size: 16px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #ffffff;
            }
          }
          button {
            width: 177px;
            height: 36px;
            background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
            border-radius: 4px;
            border: 0;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            cursor: pointer;
            margin-top: 35px;
            margin-left: 60px;
          }
        }
        .Dealtop2Dev-img {
          width: 299px;
          height: 24px;
          margin-top: 38px;
        }
      }
    }
  }
  .Deal-top3 {
    height: 520px;
    background: #3370ff;
    width: 100%;
    background: url(./img/advantage_list_bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    .DealTop3Banxin {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;
      p {
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #ffffff;
        margin-top: 80px;
        margin-bottom: 60px;
        text-align: center;
      }
      ul {
        display: flex;
        li {
          width: calc(25%);
          display: flex;
          flex-direction: column;
          align-items: center;
          div:nth-child(1) {
            width: 100px;
            height: 100px;
            background: #ffffff;
            box-shadow: 0px 25px 25px 0px #3370ff;
            border-radius: 50%;
            position: relative;
            img {
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
            }
            div {
              width: 23px;
              height: 23px;
              background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
              border-radius: 50%;
              position: absolute;
              bottom: -18px;
              right: 0;
            }
          }
          div:nth-child(2) {
            font-size: 20px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            margin: 26px 0 15px;
          }
          div:nth-child(3) {
            width: 40px;
            height: 3px;
            background: linear-gradient(
              270deg,
              #ffffff 0%,
              rgba(255, 255, 255, 0) 100%
            );
            opacity: 0.39;
          }
          div:nth-child(4) {
            width: 216px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            text-align: center;
            margin-top: 15px;
          }
        }
      }
    }
  }
  .Deal-top4 {
    width: 100%;
    .DealWZ1 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin: 80px 0 33px;
    }
    .DealTop4Banxin {
      width: 1200px;
      margin: 0 auto;
      .DealTop4Banxin-TOP {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        .DealTop4BanxinTOP-div {
          width: 585px;
          height: 284px;
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #eeeeee;
          padding: 32px 32px 30px 32px;
          box-sizing: border-box;
          display: flex;
          div:nth-child(1) {
            width: 68px;
            p {
              font-size: 16px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #333333;
              text-align: center;
              margin-top: 10px;
            }
          }
          div:nth-child(2) {
            margin-left: 30px;
            p:nth-child(1) {
              font-size: 20px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: #333333;
              margin-top: 10px;
            }
            p:nth-child(2) {
              background: #fafafa;
              border-radius: 10px;
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 24px;
              padding: 20px;
              margin: 16px 0 12px 0;
            }
            p:nth-child(3) {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #333333;
            }
          }
        }
      }
      button {
        width: 177px;
        height: 36px;
        background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
        border-radius: 4px;
        border: none;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        cursor: pointer;
        margin-left: 510px;
      }
    }
  }
  .Deal-top5 {
    width: 100%;
    height: 481px;
    background: url(./img/位图备份.png);
    background-repeat: no-repeat;
    background-size: cover;
    margin-top: 80px;

    .DealTop5Banxin {
      width: 1200px;
      margin: 0 auto;
      .DealTop5-rigthg {
        float: right;
      }
      .DealTop5-left {
        float: left;
        p:nth-child(1) {
          font-size: 32px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #333333;
          margin-top: 17px;
          margin-bottom: 8.5px;
        }
        p:nth-child(2) {
          width: 40px;
          height: 4px;
          background: #ff7a5a;
        }
        p:nth-child(3) {
          width: 600px;
          height: 144px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 24px;
          margin-top: 60px;
        }
      }
    }
  }
  .Deal-top6 {
    background: linear-gradient(180deg, #fdffff 0%, #eaf7ff 100%);
    .DealWZ1 {
      font-size: 32px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #333333;
      text-align: center;
      margin-top: 80px;
      margin-bottom: 24px;
    }
    .p1 {
      width: 626px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      margin: 0 auto;
      text-align: center;
    }
  }
  .Deal-top7 {
    height: 380px;
    background: #eaf7ff;
    .DealTop7-div {
      width: 100%;
      overflow: hidden;
      height: 300px;
      position: relative;
      ul:nth-child(1) {
        width: 7200px;
        display: flex;
        position: absolute;
        top: 0;
        left: 0;
        li {
          height: 120px;
          width: 240px;
          margin: 10px;
          background: blue;
          border: 1px solid #eeeeee;
          background: #ffffff;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      ul:nth-child(2) {
        width: 7200px;
        display: flex;
        position: absolute;
        top: 140px;
        left: -80px;
        li {
          height: 120px;
          width: 205px;
          margin: 10px;
          background: blue;
          border: 1px solid #eeeeee;
          background: #ffffff;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  .Deal-top8 {
    width: 100%;
    height: 210px;
    background: #1f2430;
    overflow: hidden;
    ul {
      display: flex;
      justify-content: center;
      color: white;
      margin-top: 60px;
      li {
        display: flex;
        align-items: center;
        font-size: 14px;
        cursor: pointer;
        div {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: white;
          margin-left: 20px;
        }
        span {
          margin-left: 15px;
        }
        span:hover {
          color: rgb(98, 98, 226);
          border-bottom: 1px solid rgb(98, 98, 226);
        }
      }
    }
    .p1 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
      margin-top: 30px;
    }
    .p2 {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      text-align: center;
      margin-top: 10px;
      span:hover {
        color: rgb(98, 98, 226);
        border-bottom: 1px solid rgb(98, 98, 226);
        cursor: pointer;
      }
    }
  }

  .box {
    width: 48px;
    height: 48px;
    background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
    position: fixed;
    border-radius: 6px;
    right: 8px;
    bottom: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .boxs {
    width: 130px;
    height: 150px;
    background: linear-gradient(180deg, #ffa03f 0%, #ff3000 100%);
    position: fixed;
    border-radius: 6px;
    right: 65px;
    bottom: 100px;
    p {
      font-size: 12px;
      font-family: PingFangSC-Semibold, PingFang SC;
      color: white;
      text-align: center;
    }
  }
}
</style>

<style scoped>
.el-dialog {
  border-radius: 10px;
}
</style>