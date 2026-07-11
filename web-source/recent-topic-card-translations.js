(function (root) {
  const { topics } = typeof module !== "undefined"
    ? require("./subtopics.js")
    : { topics: root.RECENT_SUBTOPIC_DATA };

  const translations = {
    Technology: [
      ["Workplace Technology & Computer Skills", [
        "必备的计算机技能", "培养计算机技能", "现代职场技术", "采用职场技术",
        "高效的自动化工具", "使用自动化工具", "实用的技术培训", "提供技术培训"
      ]],
      ["Communication Technology & Relationships", [
        "即时通信技术", "使用通信技术", "便捷的在线交流", "改善在线交流",
        "有意义的面对面互动", "保持面对面互动", "清晰的隐私边界", "设定隐私边界"
      ]],
      ["Science, Food Technology & Space Exploration", [
        "严谨的科学研究", "开展科学研究", "先进的食品技术", "开发食品技术",
        "雄心勃勃的太空探索", "资助太空探索", "重大的科学突破", "取得科学突破"
      ]],
      ["Technology in International Business", [
        "技术驱动的国际业务", "拓展国际业务", "跨境电子商务", "推动电子商务",
        "安全的数字支付", "采用数字支付", "实时商业数据", "分析商业数据"
      ]],
      ["Product Innovation & Consumer Choice", [
        "持续的产品创新", "推动产品创新", "广泛的消费者选择", "扩大消费者选择",
        "频繁推出的产品新版本", "发布产品新版本", "基本维修权", "保障维修权"
      ]]
    ],
    Education: [
      ["Curriculum: Math, History & Business", [
        "基础数学教育", "加强数学教育", "全面的历史课程", "修订历史课程",
        "实用的商业课程", "开设商业课程", "有限的课堂时间", "分配课堂时间"
      ]],
      ["Learning Methods: Group Study & Self-study", [
        "高效的小组学习", "鼓励小组学习", "有效的自主学习", "推动自主学习",
        "建设性的同伴反馈", "提供同伴反馈", "更强的学习自主性", "培养学习自主性"
      ]],
      ["Assessment & Student Motivation", [
        "强烈的学习动机", "提升学习动机", "公平的学业评估", "开展学业评估",
        "高风险标准化考试", "改革标准化考试", "持久的内在动机", "培养内在动机"
      ]],
      ["Adult Literacy & Educational Access", [
        "基本的成人读写能力", "提升成人读写能力", "平等的教育机会", "扩大教育机会",
        "社区读写项目", "资助读写项目", "长期存在的教育不平等", "减少教育不平等"
      ]],
      ["Employability: University vs Work", [
        "较强的就业能力", "提升就业能力", "学术型大学教育", "接受大学教育",
        "相关工作经验", "积累工作经验", "竞争激烈的劳动力市场", "进入劳动力市场"
      ]],
      ["Moral Education & Character Development", [
        "有效的道德教育", "加强道德教育", "早期品格发展", "促进品格发展",
        "真诚的同理心", "培养同理心", "明确的行为规范", "制定行为规范"
      ]]
    ],
    Environment: [
      ["Consumption & Fast Fashion", [
        "浪费严重的快时尚", "批评快时尚", "不可持续的消费习惯", "改变消费习惯",
        "大量纺织废弃物", "减少纺织废弃物", "低废弃循环经济", "建设循环经济"
      ]],
      ["Food Systems: Vegetarianism & Scientific Farming", [
        "可持续的食物系统", "改革食物系统", "植物性素食饮食", "采用素食饮食",
        "数据驱动的科学农业", "推广科学农业", "气候智能型可持续农业", "发展可持续农业"
      ]],
      ["Biodiversity & Animal Protection", [
        "丰富的生物多样性", "保护生物多样性", "极度濒危物种", "拯救濒危物种",
        "有效的野生动物保护", "资助野生动物保护", "脆弱的生态平衡", "维持生态平衡"
      ]],
      ["Tourism & Untouched Natural Places", [
        "原始未开发的自然区域", "保护未开发的自然区域", "低影响生态旅游", "推广生态旅游",
        "未受破坏的自然景观", "保护自然景观", "受控的公众进入", "限制公众进入"
      ]],
      ["Sustainable Travel & Aviation", [
        "低碳可持续出行", "鼓励可持续出行", "频繁的航空旅行", "减少航空旅行",
        "高额碳排放", "削减碳排放", "经核实的碳抵消", "购买碳抵消额度"
      ]],
      ["Local Resources & Supply Chains", [
        "可利用的本地资源", "利用本地资源", "短程本地供应链", "加强本地供应链",
        "新鲜的本地食品", "购买本地食品", "更高的供应链透明度", "提高供应链透明度"
      ]]
    ],
    Government: [
      ["Public Funding & Spending Priorities", [
        "有限的公共资金", "分配公共资金", "明确的支出重点", "设定支出重点",
        "基本公共服务", "资助公共服务", "高度的财政责任", "履行财政责任"
      ]],
      ["Regulation, Bans & Restrictions", [
        "严格的政府监管", "执行政府监管", "合理的法律限制", "引入法律限制",
        "更广泛的公共利益", "服务公共利益", "稳定的社会秩序", "维护社会秩序"
      ]],
      ["Law Enforcement & Road Safety Laws", [
        "有效的执法", "加强执法", "严格的道路安全法规", "执行道路安全法规",
        "有效驾驶执照", "取得驾驶执照", "基本的行人安全", "保障行人安全"
      ]],
      ["Cultural Policy & Public Art Funding", [
        "包容性的文化政策", "制定文化政策", "便于公众接触的公共艺术", "资助公共艺术",
        "宝贵的文化遗产", "保护文化遗产", "广泛的文化参与", "鼓励文化参与"
      ]],
      ["Evidence-based Balanced Policy", [
        "可靠的循证政策", "制定循证政策", "务实的平衡方案", "采取平衡方案",
        "复杂的权衡取舍", "权衡利弊", "长期政策影响", "评估政策影响"
      ]]
    ],
    Society: [
      ["Parenting, Boundaries & Child Freedom", [
        "亲密的亲子关系", "加强亲子关系", "一致的父母管教", "实施父母管教",
        "健康的界限", "设定明确界限", "稳定的情感支持", "提供情感支持"
      ]],
      ["Youth Crime & Behavior", [
        "不断上升的青少年犯罪", "预防青少年犯罪", "攻击性反社会行为", "遏制反社会行为",
        "有效的社区监督", "加强社区监督", "及时的早期干预", "提供早期干预"
      ]],
      ["Family Relationships & Lifestyle Change", [
        "亲密的家庭关系", "维持家庭关系", "快速的生活方式变化", "适应生活方式变化",
        "牢固的家庭纽带", "加强家庭纽带", "有限的家庭相处时间", "共度家庭时光"
      ]],
      ["Competition vs Cooperation", [
        "激烈的竞争", "鼓励竞争", "强烈的合作精神", "培养合作精神",
        "有效的团队合作", "促进团队合作", "健康公平的竞争", "确保公平竞争"
      ]],
      ["Gifts, Money & Social Values", [
        "较高的金钱价值", "看重礼物的金钱价值", "深厚的情感价值", "保留情感价值",
        "传统的礼物交换", "进行礼物交换", "过度的物质主义", "反对物质主义"
      ]]
    ],
    Health: [
      ["Diet, Vegetarianism & Healthy Eating", [
        "营养均衡的饮食", "保持均衡饮食", "植物性素食饮食", "采用素食饮食",
        "充足的营养摄入", "监测营养摄入", "不健康的饮食习惯", "改变饮食习惯"
      ]],
      ["Sedentary Lifestyle & Public Health", [
        "高度久坐的生活方式", "避免久坐生活方式", "规律的身体活动", "增加身体活动",
        "不断上升的肥胖率", "降低肥胖率", "有效的职场健康计划", "推广职场健康计划"
      ]],
      ["Food Safety & Natural Food", [
        "严格的食品安全标准", "确保食品安全", "低加工天然食品", "选择天然食品",
        "清晰的食品标签", "阅读食品标签", "透明的供应链", "追踪供应链"
      ]],
      ["Mental Health & Technology Use", [
        "不佳的心理健康状况", "改善心理健康", "过度使用科技", "管理科技使用",
        "强迫性使用社交媒体", "限制社交媒体使用", "健康的数字边界", "设定数字边界"
      ]]
    ],
    Urbanization: [
      ["Traffic Congestion & Public Transport", [
        "严重的交通拥堵", "缓解交通拥堵", "可靠的公共交通", "改善公共交通",
        "可负担的公共交通票价", "补贴公共交通票价", "依赖汽车的出行习惯", "改变出行习惯"
      ]],
      ["Road Safety & Driving Laws", [
        "公共道路安全", "改善道路安全", "严格的交通法规", "执行交通法规",
        "有效驾驶执照", "取得驾驶执照", "高额交通罚款", "处以交通罚款"
      ]],
      ["Rural-urban Migration", [
        "大规模城乡迁移", "管理城乡迁移", "薪资更高的城市就业", "寻求城市就业",
        "巨大的城乡差距", "缩小城乡差距", "均衡的农村发展", "促进农村发展"
      ]],
      ["Urban Population Growth", [
        "不断增长的城市人口", "容纳城市人口", "快速的人口增长", "控制人口增长",
        "不断上升的住房需求", "满足住房需求", "不堪重负的城市服务", "改善城市服务"
      ]],
      ["Housing Styles & Local Identity", [
        "独特的住宅风格", "保护住宅风格", "保存完好的传统住宅", "修复传统住宅",
        "独特的地方特色", "保留地方特色", "强烈的社区认同", "增强社区认同"
      ]],
      ["Transport Infrastructure & Logistics", [
        "现代交通基础设施", "升级交通基础设施", "广泛的道路网络", "扩大道路网络",
        "一体化物流系统", "改善物流系统", "有韧性的供应链", "加强供应链"
      ]]
    ],
    Media: [
      ["Advertising Influence & Consumer Awareness", [
        "强大的广告影响力", "抵制广告影响", "较强的消费者意识", "提高消费者意识",
        "欺骗性的误导广告", "禁止误导广告", "理性且知情的选择", "做出知情选择"
      ]],
      ["News Relevance & Public Information", [
        "全面的新闻报道", "提供新闻报道", "准确的公共信息", "传播公共信息",
        "平衡的政治新闻", "分析政治新闻", "及时且相关的信息", "获取相关信息"
      ]],
      ["Violent Media & Regulation", [
        "直观的暴力内容", "限制暴力内容", "过度的媒体暴力", "监管媒体暴力",
        "明确的内容分级", "显示内容分级", "明确的平台责任", "强化平台责任"
      ]],
      ["Good News & Media Effects", [
        "鼓舞人心的正面新闻", "分享正面新闻", "健康的社会乐观情绪", "促进社会乐观情绪",
        "负责任的平衡报道", "践行平衡报道", "聚焦解决方案的建设性新闻", "鼓励建设性新闻"
      ]],
      ["Information Trust & Media Literacy", [
        "可信可靠的信息来源", "查阅可靠来源", "彻底的事实核查", "开展事实核查",
        "必备的媒介素养", "培养媒介素养", "独立的批判性思维", "培养批判性思维"
      ]]
    ],
    Economy: [
      ["Career Change & Workforce Mobility", [
        "频繁的职业转变", "进行职业转变", "较高的劳动力流动性", "促进劳动力流动",
        "宝贵的可迁移技能", "培养可迁移技能", "较强的职业适应力", "建立职业适应力"
      ]],
      ["Salary-driven Career Choices", [
        "有竞争力的薪资水平", "比较薪资水平", "有吸引力的高薪工作", "寻找高薪工作",
        "沉重的经济压力", "缓解经济压力", "健康的工作生活平衡", "保持工作生活平衡"
      ]],
      ["International Business & Logistics", [
        "全球国际贸易", "扩大国际贸易", "有韧性的供应链", "加强供应链",
        "高效的物流网络", "建设物流网络", "严格的贸易壁垒", "消除贸易壁垒"
      ]],
      ["Tourism Development", [
        "盈利的旅游业", "发展旅游业", "可观的旅游收入", "创造旅游收入",
        "有害的过度旅游", "控制过度旅游", "可持续旅游管理", "改善旅游管理"
      ]],
      ["Older Workers & Workplace Demographics", [
        "经验丰富的老年员工", "留用老年员工", "快速老龄化的劳动力", "管理老龄化劳动力",
        "便于参与的再培训项目", "提供再培训项目", "基本的职场尊严", "维护职场尊严"
      ]],
      ["Product Versions & Consumerism", [
        "频繁推出的产品新版本", "发布产品新版本", "小幅产品升级", "推广产品升级",
        "蓄意的计划性报废", "采用计划性报废", "负责任的理性消费", "倡导理性消费"
      ]]
    ],
    Arts: [
      ["Heritage Preservation & Historical Sites", [
        "有形文化遗产", "保护文化遗产", "保存完好的历史遗址", "保护历史遗址",
        "拥有数百年历史的建筑", "修复历史建筑", "严格的保护措施", "实施保护措施"
      ]],
      ["Architecture & Local Identity", [
        "独特的建筑风格", "保护建筑风格", "独特的地方认同", "增强地方认同",
        "历史街区", "保护历史街区", "辨识度高的地标建筑", "维护地标建筑"
      ]],
      ["Public Art & Government Funding", [
        "便于公众接触的公共艺术", "资助公共艺术", "大量的政府资助", "分配政府资助",
        "有争议的艺术项目", "支持艺术项目", "更广泛的公共利益", "服务公共利益"
      ]],
      ["Art Galleries & Cultural Participation", [
        "公共美术馆", "参观美术馆", "互动式展览", "举办展览",
        "广泛的文化参与", "鼓励文化参与", "可负担的票价", "降低票价"
      ]],
      ["Language & Culture Learning", [
        "有效的语言学习", "促进语言学习", "深入的文化理解", "培养文化理解",
        "流利的跨文化交流", "改善跨文化交流", "丰富的文化沉浸", "体验文化沉浸"
      ]],
      ["History Research & Social Value", [
        "严谨的历史研究", "开展历史研究", "可靠的历史证据", "审视历史证据",
        "共同的集体记忆", "保存集体记忆", "批判性的历史视角", "采用历史视角"
      ]]
    ]
  };

  const cards = topics.flatMap((topic) => {
    const topicTranslations = translations[topic.id];
    if (!Array.isArray(topicTranslations) || topicTranslations.length !== topic.subtopics.length) {
      throw new Error(`Translation subtopic count mismatch for ${topic.id}.`);
    }

    return topic.subtopics.flatMap(([subtopic, , phrases], subtopicIndex) => {
      const [translatedSubtopic, chinesePhrases] = topicTranslations[subtopicIndex];
      if (translatedSubtopic !== subtopic || chinesePhrases.length !== phrases.length) {
        throw new Error(`Translation alignment mismatch for ${topic.id} / ${subtopic}.`);
      }

      return phrases.map((english, phraseIndex) => {
        const chinese = chinesePhrases[phraseIndex];
        return {
          topic: topic.id,
          subtopic,
          english,
          chinese,
          type: phraseIndex % 2 === 0 ? "adjective" : "verb",
          highlightEnglish: english.split(/\s+/)[0],
          highlightChinese: chinese
        };
      });
    });
  });

  const table = { version: 1, cards };
  root.RECENT_TOPIC_CARD_TRANSLATIONS = table;
  if (typeof module !== "undefined") {
    module.exports = table;
  }
})(typeof window !== "undefined" ? window : globalThis);
