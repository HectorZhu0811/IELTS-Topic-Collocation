const BASE_ENTRIES = [
  ["Technology","科技进步","technological advancement / progress","快速的","rapid","rapid technological advancement","推动","drive","drive technological progress"],
  ["Technology","现代科技","modern / cutting-edge technology","尖端的","cutting-edge","cutting-edge technology","采用","adopt","adopt modern technology"],
  ["Technology","高科技产品","high-tech products / gadgets","创新的","innovative","innovative high-tech products","开发","develop","develop high-tech products"],
  ["Technology","自动化","automation","工业的","industrial","industrial automation","促进","promote","promote automation"],
  ["Technology","虚拟/增强现实","virtual / augmented reality","沉浸式的","immersive","immersive virtual reality","使用","use","use augmented reality"],
  ["Technology","数字化","digitalization","大规模的","large-scale","large-scale digitalization","加速","accelerate","accelerate digitalization"],
  ["Technology","技术革命","technological revolution","重大的","major","major technological revolution","引发","spark","spark a technological revolution"],
  ["Technology","颠覆性创新","disruptive innovation","激进的","radical","radical disruptive innovation","鼓励","encourage","encourage disruptive innovation"],
  ["Technology","网络安全","cybersecurity","强健的","robust","robust cybersecurity","加强","strengthen","strengthen cybersecurity"],
  ["Technology","网络隐私","online privacy","个人的","personal","personal online privacy","保护","protect","protect online privacy"],
  ["Technology","数据泄露","data breach / data leak","大规模的","massive","massive data breach","防止","prevent","prevent data breaches"],
  ["Technology","信息过载","information overload","持续的","constant","constant information overload","减少","reduce","reduce information overload"],
  ["Technology","虚假信息","misinformation / fake news","广泛传播的","widespread","widespread misinformation","打击","combat","combat fake news"],
  ["Technology","网络欺凌","cyberbullying","严重的","serious","serious cyberbullying","应对","tackle","tackle cyberbullying"],
  ["Technology","屏幕时间","screen time","过多的","excessive","excessive screen time","限制","limit","limit screen time"],
  ["Technology","数字鸿沟","digital divide","巨大的","wide","wide digital divide","弥合","bridge","bridge the digital divide"],
  ["Technology","信息贫困","information poverty","严重的","severe","severe information poverty","缓解","alleviate","alleviate information poverty"],
  ["Technology","虚拟课堂","virtual classroom","互动式的","interactive","interactive virtual classroom","创建","create","create virtual classrooms"],
  ["Technology","数字化教学资源","digital learning materials","高质量的","high-quality","high-quality digital learning materials","提供","provide","provide digital learning materials"],
  ["Technology","自动评分系统","automated grading system","可靠的","reliable","reliable automated grading system","使用","use","use automated grading systems"],
  ["Technology","AI助教","AI-powered tutor / AI assistant","个性化的","personalized","personalized AI-powered tutor","部署","deploy","deploy AI assistants"],
  ["Technology","远程办公","remote work / telecommuting","灵活的","flexible","flexible remote work","支持","enable","enable remote work"],
  ["Technology","视频会议","video conferencing","顺畅的","seamless","seamless video conferencing","使用","use","use video conferencing"],
  ["Technology","数字协作","digital collaboration","高效的","efficient","efficient digital collaboration","促进","facilitate","facilitate digital collaboration"],
  ["Technology","科学研究","scientific research","严谨的","rigorous","rigorous scientific research","开展","conduct","conduct scientific research"],
  ["Technology","医疗技术","medical technology","先进的","advanced","advanced medical technology","发展","develop","develop medical technology"],
  ["Technology","基因编辑","gene editing","精准的","precise","precise gene editing","监管","regulate","regulate gene editing"],
  ["Technology","远程医疗","telemedicine","可及的","accessible","accessible telemedicine","扩大","expand","expand telemedicine"],
  ["Technology","数字健康","digital health","个性化的","personalized","personalized digital health","推广","promote","promote digital health"],
  ["Technology","疫苗开发","vaccine development","快速的","rapid","rapid vaccine development","加速","accelerate","accelerate vaccine development"],
  ["Technology","人工器官","artificial organs","生物相容的","biocompatible","biocompatible artificial organs","植入","implant","implant artificial organs"],
  ["Technology","机器人手术","robotic surgery","微创的","minimally invasive","minimally invasive robotic surgery","实施","perform","perform robotic surgery"],
  ["Technology","智能家居","smart home","自动化的","automated","automated smart home","安装","install","install smart home devices"],
  ["Technology","可穿戴技术","wearable technology","健康追踪型的","health-tracking","health-tracking wearable technology","使用","use","use wearable technology"],
  ["Technology","自动驾驶汽车","self-driving car / autonomous car","完全自动驾驶的","fully autonomous","fully autonomous car","测试","test","test self-driving cars"],
  ["Technology","无人机配送","drone delivery","快速的","fast","fast drone delivery","推出","launch","launch drone delivery"],

  ["Education","公立学校","public school / state school","资金充足的","well-funded","well-funded public school","就读于","attend","attend public school"],
  ["Education","私立学校","private / independent school","有声望的","prestigious","prestigious private school","入读","enrol in","enrol in an independent school"],
  ["Education","寄宿学校","boarding school","精英的","elite","elite boarding school","送孩子去","send children to","send children to boarding school"],
  ["Education","义务教育","compulsory education","普及的","universal","universal compulsory education","提供","provide","provide compulsory education"],
  ["Education","高等教育","higher education / tertiary education","可及的","accessible","accessible higher education","接受","pursue","pursue higher education"],
  ["Education","职业教育","vocational education / training","实用的","practical","practical vocational education","扩大","expand","expand vocational training"],
  ["Education","远程学习","distance learning / remote education","灵活的","flexible","flexible distance learning","提供","offer","offer remote education"],
  ["Education","终身学习","lifelong learning","持续的","continuous","continuous lifelong learning","促进","promote","promote lifelong learning"],
  ["Education","教育公平","educational equity / equality of access","真正的","genuine","genuine educational equity","确保","ensure","ensure equality of access"],
  ["Education","课程","curriculum / syllabus","设计良好的","well-designed","well-designed curriculum","修订","revise","revise the curriculum"],
  ["Education","必修课程","compulsory / elective course","强制性的","mandatory","mandatory compulsory course","选择","choose","choose an elective course"],
  ["Education","考试压力","exam pressure / test anxiety","强烈的","intense","intense exam pressure","减少","reduce","reduce test anxiety"],
  ["Education","标准化考试","standardized testing","全国性的","nationwide","nationwide standardized testing","改革","reform","reform standardized testing"],
  ["Education","持续性评估","continuous assessment","公平的","fair","fair continuous assessment","实施","implement","implement continuous assessment"],
  ["Education","应试教育","exam-oriented education","僵化的","rigid","rigid exam-oriented education","超越","move beyond","move beyond exam-oriented education"],
  ["Education","自主学习","independent learning / self-directed learning","有效的","effective","effective independent learning","鼓励","encourage","encourage self-directed learning"],
  ["Education","面授学习","face-to-face learning","传统的","traditional","traditional face-to-face learning","结合","combine","combine face-to-face learning with online learning"],
  ["Education","线上学习","online learning / e-learning","互动式的","interactive","interactive online learning","采用","adopt","adopt e-learning"],
  ["Education","混合学习","blended learning","灵活的","flexible","flexible blended learning","引入","introduce","introduce blended learning"],
  ["Education","小组学习","group work / collaborative learning","高效的","productive","productive group work","促进","facilitate","facilitate collaborative learning"],
  ["Education","探究式教学","heuristic teaching / inquiry-based teaching","以学生为中心的","student-centred","student-centred inquiry-based teaching","应用","apply","apply heuristic teaching"],
  ["Education","个性化教学","tailored / personalized teaching","高度个性化的","highly personalized","highly personalized teaching","提供","provide","provide tailored teaching"],
  ["Education","实践导向学习","hands-on / experiential learning","实用的","practical","practical hands-on learning","强调","emphasize","emphasize experiential learning"],
  ["Education","死记硬背","rote memorization","机械的","mechanical","mechanical rote memorization","抑制","discourage","discourage rote memorization"],
  ["Education","高成就学生","high achiever / underachiever","稳定的","consistent","consistent high achiever","支持","support","support underachievers"],
  ["Education","全面发展的人","well-rounded individuals","全面发展的","well-rounded","well-rounded individuals","培养","develop","develop well-rounded individuals"],
  ["Education","社会责任感","sense of social responsibility","强烈的","strong","strong sense of social responsibility","培养","cultivate","cultivate a sense of social responsibility"],
  ["Education","独立思考","independent thinking","批判性的","critical","critical independent thinking","培养","foster","foster independent thinking"],
  ["Education","文化认同","cultural identity","强烈的","strong","strong cultural identity","维护","preserve","preserve cultural identity"],
  ["Education","公民意识","civic awareness","强烈的","strong","strong civic awareness","提高","raise","raise civic awareness"],
  ["Education","职业准备","career preparation","充分的","adequate","adequate career preparation","提供","provide","provide career preparation"],
  ["Education","学费","tuition fees","快速上涨的","rapidly rising","rapidly rising tuition fees","控制","control","control tuition fees"],
  ["Education","教育资源不均衡","unequal distribution of educational resources","严重的","serious","serious unequal distribution of educational resources","解决","address","address unequal distribution of educational resources"],
  ["Education","辍学","dropout","过早的","early","early dropout","防止","prevent","prevent dropout"],
  ["Education","校园霸凌","school bullying","持续存在的","persistent","persistent school bullying","应对","tackle","tackle school bullying"],
  ["Education","教育商品化","commercialization of education","过度的","excessive","excessive commercialization of education","批判","criticize","criticize commercialization of education"],
  ["Education","学历贬值","degree inflation","严重的","serious","serious degree inflation","减少","reduce","reduce degree inflation"],

  ["Environment","气候变化","climate change","加速的","accelerating","accelerating climate change","缓解","mitigate","mitigate climate change"],
  ["Environment","全球变暖","global warming","快速的","rapid","rapid global warming","减缓","slow","slow global warming"],
  ["Environment","温室气体","greenhouse gases","有害的","harmful","harmful greenhouse gases","减少","reduce","reduce greenhouse gases"],
  ["Environment","污染","pollution","严重的","severe","severe pollution","应对","tackle","tackle pollution"],
  ["Environment","碳足迹","carbon footprint","巨大的","large","large carbon footprint","减少","reduce","reduce carbon footprint"],
  ["Environment","生态足迹","ecological footprint","沉重的","heavy","heavy ecological footprint","最小化","minimize","minimize ecological footprint"],
  ["Environment","森林砍伐","deforestation","大规模的","large-scale","large-scale deforestation","遏制","curb","curb deforestation"],
  ["Environment","环境恶化","environmental degradation","严重的","serious","serious environmental degradation","防止","prevent","prevent environmental degradation"],
  ["Environment","回收","recycling","家庭的","household","household recycling","推广","promote","promote recycling"],
  ["Environment","垃圾分类","waste-sorting / waste separation","强制性的","mandatory","mandatory waste-sorting","实施","implement","implement waste-sorting"],
  ["Environment","节能","energy conservation","有效的","effective","effective energy conservation","鼓励","encourage","encourage energy conservation"],
  ["Environment","绿色出行","green commuting","低碳的","low-carbon","low-carbon green commuting","选择","choose","choose green commuting"],
  ["Environment","可持续发展","sustainable development","长期的","long-term","long-term sustainable development","实现","achieve","achieve sustainable development"],
  ["Environment","水能","hydroelectric power","可再生的","renewable","renewable hydroelectric power","产生","generate","generate hydroelectric power"],
  ["Environment","太阳能","solar power","丰富的","abundant","abundant solar power","利用","harness","harness solar power"],
  ["Environment","风能","wind energy","清洁的","clean","clean wind energy","生产","produce","produce wind energy"],
  ["Environment","生物多样性","biodiversity","丰富的","rich","rich biodiversity","保护","protect","protect biodiversity"],
  ["Environment","生态系统","ecosystem","脆弱的","fragile","fragile ecosystem","恢复","restore","restore ecosystems"],
  ["Environment","濒危物种","endangered species","极度濒危的","critically endangered","critically endangered species","保护","protect","protect endangered species"],
  ["Environment","栖息地破坏","habitat destruction","广泛的","widespread","widespread habitat destruction","防止","prevent","prevent habitat destruction"],
  ["Environment","环保意识","environmental awareness","强烈的","strong","strong environmental awareness","提高","raise","raise environmental awareness"],
  ["Environment","环保教育","environmental education","实用的","practical","practical environmental education","提供","provide","provide environmental education"],
  ["Environment","环保法规","environmental regulations","严格的","strict","strict environmental regulations","执行","enforce","enforce environmental regulations"],
  ["Environment","国际合作","international cooperation","全球性的","global","global international cooperation","加强","strengthen","strengthen international cooperation"],

  ["Government","政府干预","government intervention","过度的","excessive","excessive government intervention","减少","reduce","reduce government intervention"],
  ["Government","市场导向手段","market-oriented measures","有针对性的","targeted","targeted market-oriented measures","采用","adopt","adopt market-oriented measures"],
  ["Government","高质量公共服务","high-quality public services","可及的","accessible","accessible high-quality public services","提供","provide","provide high-quality public services"],
  ["Government","政策制定","policy-making","基于证据的","evidence-based","evidence-based policy-making","改善","improve","improve policy-making"],
  ["Government","纳税人","taxpayers","普通的","ordinary","ordinary taxpayers","保护","protect","protect taxpayers"],
  ["Government","政府支出","government spending","过度的","excessive","excessive government spending","减少","reduce","reduce government spending"],
  ["Government","国家预算","national budget","年度的","annual","annual national budget","批准","approve","approve a national budget"],
  ["Government","政府问责","government accountability","更强的","greater","greater government accountability","加强","strengthen","strengthen government accountability"],
  ["Government","法治","rule of law","强有力的","strong","strong rule of law","维护","uphold","uphold the rule of law"],
  ["Government","立法","legislation","全面的","comprehensive","comprehensive legislation","引入","introduce","introduce legislation"],
  ["Government","法案","bill","拟议的","proposed","proposed bill","通过","pass","pass a bill"],
  ["Government","法规","regulation","严格的","strict","strict regulation","执行","enforce","enforce regulation"],
  ["Government","修正案","amendment","宪法性的","constitutional","constitutional amendment","提出","propose","propose an amendment"],
  ["Government","司法独立","judicial independence","真正的","genuine","genuine judicial independence","维护","safeguard","safeguard judicial independence"],
  ["Government","法律执行","law enforcement","有效的","effective","effective law enforcement","加强","strengthen","strengthen law enforcement"],
  ["Government","权利与义务","rights and obligations","基本的","fundamental","fundamental rights and obligations","平衡","balance","balance rights and obligations"],
  ["Government","正当程序","due process","公平的","fair","fair due process","保障","guarantee","guarantee due process"],
  ["Government","国家主权","national sovereignty","完整的","full","full national sovereignty","捍卫","defend","defend national sovereignty"],
  ["Government","条约与协议","treaty and agreement","国际性的","international","international treaty and agreement","签署","sign","sign a treaty and agreement"],
  ["Government","引渡","extradition","正式的","formal","formal extradition","请求","request","request extradition"],
  ["Government","跨境犯罪","transnational crime","有组织的","organized","organized transnational crime","打击","combat","combat transnational crime"],
  ["Government","贩毒","drug trafficking","大规模的","large-scale","large-scale drug trafficking","打击","combat","combat drug trafficking"],
  ["Government","人口贩卖","human trafficking","跨境的","cross-border","cross-border human trafficking","防止","prevent","prevent human trafficking"],
  ["Government","洗钱","money laundering","非法的","illegal","illegal money laundering","打击","combat","combat money laundering"],
  ["Government","偷渡","smuggling of migrants","有组织的","organized","organized smuggling of migrants","严厉打击","crack down on","crack down on the smuggling of migrants"],
  ["Government","多边合作机制","multilateral cooperation","有效的","effective","effective multilateral cooperation","加强","strengthen","strengthen multilateral cooperation"],

  ["Society","人口老龄化","aging population","快速增长的","rapidly growing","rapidly growing aging population","应对","address","address aging population"],
  ["Society","出生率","birth rate","持续偏低的","persistently low","persistently low birth rate","逆转","reverse","reverse a low birth rate"],
  ["Society","单亲家庭","single-parent family","脆弱的","vulnerable","vulnerable single-parent family","支持","support","support single-parent families"],
  ["Society","核心家庭","nuclear family","典型的","typical","typical nuclear family","组建","form","form a nuclear family"],
  ["Society","代际关系","intergenerational relationship","和谐的","harmonious","harmonious intergenerational relationship","改善","improve","improve intergenerational relationships"],
  ["Society","家庭暴力","domestic violence","严重的","severe","severe domestic violence","防止","prevent","prevent domestic violence"],
  ["Society","贫富差距","wealth gap","扩大的","widening","widening wealth gap","缩小","narrow","narrow the wealth gap"],
  ["Society","收入不平等","income inequality","严重的","serious","serious income inequality","减少","reduce","reduce income inequality"],
  ["Society","社会流动性","social mobility","向上的","upward","upward social mobility","促进","promote","promote social mobility"],
  ["Society","无家可归","homelessness","长期的","chronic","chronic homelessness","应对","tackle","tackle homelessness"],
  ["Society","社会福利","social welfare","全面的","comprehensive","comprehensive social welfare","扩大","expand","expand social welfare"],
  ["Society","最低工资","minimum wage","法定的","statutory","statutory minimum wage","提高","raise","raise the minimum wage"],
  ["Society","基本生活保障","basic living security","充足的","adequate","adequate basic living security","确保","ensure","ensure basic living security"],
  ["Society","社会排斥","social exclusion","系统性的","systemic","systemic social exclusion","对抗","combat","combat social exclusion"],
  ["Society","性别歧视","gender discrimination","持续存在的","persistent","persistent gender discrimination","消除","eliminate","eliminate gender discrimination"],
  ["Society","种族歧视","racial discrimination","制度性的","institutional","institutional racial discrimination","解决","address","address racial discrimination"],
  ["Society","残障歧视","disability discrimination","广泛存在的","widespread","widespread disability discrimination","防止","prevent","prevent disability discrimination"],
  ["Society","性别平等","gender equality","真正的","genuine","genuine gender equality","促进","promote","promote gender equality"],
  ["Society","包容社会","inclusive society","真正包容的","truly inclusive","truly inclusive society","建设","build","build an inclusive society"],
  ["Society","多元文化","multiculturalism","有活力的","vibrant","vibrant multiculturalism","拥抱","embrace","embrace multiculturalism"],
  ["Society","暴力犯罪","violent crime","严重的","serious","serious violent crime","遏制","curb","curb violent crime"],
  ["Society","青少年犯罪","juvenile delinquency","上升的","rising","rising juvenile delinquency","预防","prevent","prevent juvenile delinquency"],
  ["Society","网络犯罪","cybercrime","复杂的","sophisticated","sophisticated cybercrime","打击","combat","combat cybercrime"],
  ["Society","监禁","imprisonment","长期的","long-term","long-term imprisonment","施加","impose","impose imprisonment"],
  ["Society","改造","rehabilitation","有效的","effective","effective rehabilitation","提供","provide","provide rehabilitation"],
  ["Society","监控系统","surveillance system","广泛的","extensive","extensive surveillance system","安装","install","install surveillance systems"],
  ["Society","公民意识","civic awareness","强烈的","strong","strong civic awareness","提高","raise","raise civic awareness"],
  ["Society","志愿服务","voluntary work / community service","有意义的","meaningful","meaningful voluntary work","鼓励","encourage","encourage community service"],
  ["Society","政治参与","political participation","积极的","active","active political participation","增加","increase","increase political participation"],
  ["Society","公共抗议","public protest","和平的","peaceful","peaceful public protest","组织","organize","organize public protests"],
  ["Society","非政府组织","non-governmental organization","独立的","independent","independent non-governmental organization","资助","fund","fund non-governmental organizations"],

  ["Health","肥胖","obesity","严重的","severe","severe obesity","预防","prevent","prevent obesity"],
  ["Health","糖尿病","diabetes","2型的","type 2","type 2 diabetes","管理","manage","manage diabetes"],
  ["Health","心脏病","heart disease","慢性的","chronic","chronic heart disease","降低风险","reduce the risk of","reduce the risk of heart disease"],
  ["Health","高血压","high blood pressure","持续的","persistent","persistent high blood pressure","降低","lower","lower high blood pressure"],
  ["Health","心理健康","mental health","糟糕的","poor","poor mental health","改善","improve","improve mental health"],
  ["Health","抑郁症","depression","临床的","clinical","clinical depression","治疗","treat","treat depression"],
  ["Health","焦虑症","anxiety disorder","严重的","severe","severe anxiety disorder","诊断","diagnose","diagnose anxiety disorder"],
  ["Health","传染病","infectious disease","传染性的","contagious","contagious infectious disease","控制","control","control infectious diseases"],
  ["Health","慢性病","chronic disease","可预防的","preventable","preventable chronic disease","管理","manage","manage chronic diseases"],
  ["Health","呼吸系统疾病","respiratory diseases","严重的","serious","serious respiratory diseases","治疗","treat","treat respiratory diseases"],
  ["Health","均衡饮食","balanced diet","有营养的","nutritious","nutritious balanced diet","保持","maintain","maintain a balanced diet"],
  ["Health","快餐文化","fast food culture","普遍存在的","pervasive","pervasive fast food culture","批判","criticize","criticize fast food culture"],
  ["Health","久坐生活方式","sedentary lifestyle","高度久坐的","highly sedentary","highly sedentary lifestyle","避免","avoid","avoid a sedentary lifestyle"],
  ["Health","心理咨询","psychological counselling","专业的","professional","professional psychological counselling","寻求","seek","seek psychological counselling"],
  ["Health","情绪管理","emotional regulation","有效的","effective","effective emotional regulation","练习","practice","practice emotional regulation"],
  ["Health","自我照顾","self-care","规律的","regular","regular self-care","优先考虑","prioritize","prioritize self-care"],
  ["Health","社交支持网络","social support network","强大的","strong","strong social support network","建立","build","build a social support network"],
  ["Health","医疗体系","health care system","高效的","efficient","efficient health care system","改革","reform","reform the health care system"],
  ["Health","医疗保险","medical insurance","负担得起的","affordable","affordable medical insurance","购买","purchase","purchase medical insurance"],
  ["Health","医疗资源短缺","shortage of medical resources","严重的","acute","acute shortage of medical resources","缓解","alleviate","alleviate the shortage of medical resources"],
  ["Health","医疗费用","medical expenses","上涨的","rising","rising medical expenses","承担","cover","cover medical expenses"],
  ["Health","医患关系","doctor-patient relationship","互信的","trusting","trusting doctor-patient relationship","加强","strengthen","strengthen doctor-patient relationships"],
  ["Health","远程医疗","telemedicine","可及的","accessible","accessible telemedicine","扩大","expand","expand telemedicine"],
  ["Health","体检","health check-up","定期的","regular","regular health check-up","进行","undergo","undergo a health check-up"],
  ["Health","疫苗接种","vaccination","常规的","routine","routine vaccination","推广","promote","promote vaccination"],
  ["Health","健康教育","health education","全面的","comprehensive","comprehensive health education","提供","provide","provide health education"],
  ["Health","疾病预防","disease prevention","有效的","effective","effective disease prevention","优先考虑","prioritize","prioritize disease prevention"],
  ["Health","健康筛查","health screening","早期的","early","early health screening","开展","conduct","conduct health screening"],
  ["Health","健康促进","health promotion","社区型的","community-based","community-based health promotion","支持","support","support health promotion"],
  ["Health","公共健康政策","public health policy","基于证据的","evidence-based","evidence-based public health policy","实施","implement","implement public health policy"],
  ["Health","锻炼计划","exercise regimen","个性化的","personalized","personalized exercise regimen","遵循","follow","follow an exercise regimen"],
  ["Health","戒瘾治疗","addiction treatment","长期的","long-term","long-term addiction treatment","接受","receive","receive addiction treatment"],

  ["Urbanization","城市化","urbanization","快速的","rapid","rapid urbanization","管理","manage","manage urbanization"],
  ["Urbanization","城市扩张","urban sprawl","失控的","uncontrolled","uncontrolled urban sprawl","遏制","curb","curb urban sprawl"],
  ["Urbanization","城市规划","urban planning","长期的","long-term","long-term urban planning","改善","improve","improve urban planning"],
  ["Urbanization","城市贫民窟","urban slum","过度拥挤的","overcrowded","overcrowded urban slum","重建","redevelop","redevelop urban slums"],
  ["Urbanization","城市人口密度","urban population density","高的","high","high urban population density","降低","reduce","reduce urban population density"],
  ["Urbanization","城市犯罪","urban crime","上升的","rising","rising urban crime","打击","combat","combat urban crime"],
  ["Urbanization","生活质量","quality of life","更好的","better","better quality of life","提高","improve","improve quality of life"],
  ["Urbanization","城市绿地","urban green space","可及的","accessible","accessible urban green space","扩大","expand","expand urban green space"],
  ["Urbanization","公共交通","public transport","可靠的","reliable","reliable public transport","使用","use","use public transport"],
  ["Urbanization","私家车","private vehicle","节能的","fuel-efficient","fuel-efficient private vehicle","限制","restrict","restrict private vehicles"],
  ["Urbanization","拼车","carpooling / ride-sharing","定期的","regular","regular carpooling","鼓励","encourage","encourage ride-sharing"],
  ["Urbanization","高峰时段","rush hour","高峰的","peak","peak rush hour","避开","avoid","avoid rush hour"],
  ["Urbanization","通勤","commute","每日的","daily","daily commute","缩短","shorten","shorten the commute"],
  ["Urbanization","适合步行/骑行","walkable / bike-friendly","高度","highly","highly walkable","使城市变得","make","make cities bike-friendly"],
  ["Urbanization","交通拥堵","traffic congestion","严重的","severe","severe traffic congestion","缓解","ease","ease traffic congestion"],
  ["Urbanization","交通尾气","vehicle emissions","有害的","harmful","harmful vehicle emissions","减少","reduce","reduce vehicle emissions"],
  ["Urbanization","停车位短缺","parking shortages","长期的","chronic","chronic parking shortages","解决","address","address parking shortages"],
  ["Urbanization","分心驾驶","distracted driving","危险的","dangerous","dangerous distracted driving","防止","prevent","prevent distracted driving"],
  ["Urbanization","交通基础设施","transport infrastructure","现代化的","modern","modern transport infrastructure","升级","upgrade","upgrade transport infrastructure"],
  ["Urbanization","智能交通系统","intelligent transport system","整合的","integrated","integrated intelligent transport system","发展","develop","develop an intelligent transport system"],
  ["Urbanization","交通限行政策","traffic restriction policy","严格的","strict","strict traffic restriction policy","实施","implement","implement traffic restriction policies"],

  ["Media","大众媒体","mass media","传统的","traditional","traditional mass media","监管","regulate","regulate mass media"],
  ["Media","主流媒体","mainstream media","可信的","credible","credible mainstream media","信任","trust","trust mainstream media"],
  ["Media","数字媒体","digital media","互动式的","interactive","interactive digital media","使用","use","use digital media"],
  ["Media","社交媒体","social media","令人上瘾的","addictive","addictive social media","监控","monitor","monitor social media"],
  ["Media","独立媒体","independent media","可靠的","reliable","reliable independent media","支持","support","support independent media"],
  ["Media","新闻自由","freedom of the press","真正的","genuine","genuine freedom of the press","保护","protect","protect freedom of the press"],
  ["Media","信息传播","information dissemination","快速的","rapid","rapid information dissemination","促进","facilitate","facilitate information dissemination"],
  ["Media","媒介素养","media literacy","基本的","basic","basic media literacy","提高","improve","improve media literacy"],
  ["Media","广告活动","advertising campaign","激进的","aggressive","aggressive advertising campaign","发起","launch","launch an advertising campaign"],
  ["Media","目标受众","target audience","具体的","specific","specific target audience","触达","reach","reach the target audience"],
  ["Media","广告策略","advertising strategy","有效的","effective","effective advertising strategy","制定","develop","develop an advertising strategy"],
  ["Media","潜意识影响","subconscious influence","微妙的","subtle","subtle subconscious influence","施加","exert","exert subconscious influence"],
  ["Media","名人代言","celebrity endorsement","付费的","paid","paid celebrity endorsement","采用","use","use celebrity endorsement"],
  ["Media","品牌形象","brand image","积极的","positive","positive brand image","建立","build","build a brand image"],
  ["Media","用户生成内容","user-generated content","真实的","authentic","authentic user-generated content","创造","create","create user-generated content"],
  ["Media","错误信息","misinformation","广泛传播的","widespread","widespread misinformation","传播","spread","spread misinformation"],
  ["Media","假新闻","fake news","蓄意的","deliberate","deliberate fake news","打击","combat","combat fake news"],
  ["Media","广告操纵","advertising manipulation","微妙的","subtle","subtle advertising manipulation","揭露","expose","expose advertising manipulation"],
  ["Media","消费主义","consumerism","过度的","excessive","excessive consumerism","鼓励","encourage","encourage consumerism"],
  ["Media","媒体偏见","media bias","明显的","obvious","obvious media bias","质疑","challenge","challenge media bias"],
  ["Media","侵犯隐私","invasion of privacy","严重的","serious","serious invasion of privacy","防止","prevent","prevent invasion of privacy"],
  ["Media","公众认知","public perception","被扭曲的","distorted","distorted public perception","扭曲","skew","skew public perception"],

  ["Economy","经济增长","economic growth","可持续的","sustainable","sustainable economic growth","刺激","stimulate","stimulate economic growth"],
  ["Economy","通货膨胀","inflation","飙升的","soaring","soaring inflation","遏制","curb","curb inflation"],
  ["Economy","国内生产总值","gross domestic product","年度的","annual","annual gross domestic product","提高","increase","increase gross domestic product"],
  ["Economy","失业率","unemployment rate","高的","high","high unemployment rate","降低","lower","lower the unemployment rate"],
  ["Economy","经济危机","economic crisis","严重的","severe","severe economic crisis","渡过","weather","weather an economic crisis"],
  ["Economy","贸易顺差","trade surplus","巨大的","large","large trade surplus","保持","maintain","maintain a trade surplus"],
  ["Economy","贸易逆差","trade deficit","持续的","persistent","persistent trade deficit","减少","reduce","reduce a trade deficit"],
  ["Economy","财政政策","fiscal policy","扩张性的","expansionary","expansionary fiscal policy","采用","adopt","adopt fiscal policy"],
  ["Economy","货币政策","monetary policy","紧缩的","tight","tight monetary policy","调整","adjust","adjust monetary policy"],
  ["Economy","经济结构调整","economic restructuring","深层的","deep","deep economic restructuring","促进","promote","promote economic restructuring"],
  ["Economy","刺激措施","stimulus measures","临时的","temporary","temporary stimulus measures","引入","introduce","introduce stimulus measures"],
  ["Economy","经济相互依赖","economic interdependence","日益增长的","growing","growing economic interdependence","增加","increase","increase economic interdependence"],
  ["Economy","全球贸易增长率","global trade growth rate","疲软的","sluggish","sluggish global trade growth rate","提振","boost","boost global trade growth rate"],
  ["Economy","海外生产","offshore production","有成本效益的","cost-effective","cost-effective offshore production","转向","shift to","shift to offshore production"],
  ["Economy","自由贸易区","free trade zone","区域性的","regional","regional free trade zone","建立","establish","establish a free trade zone"],
  ["Economy","外国直接投资","foreign direct investment","大量的","substantial","substantial foreign direct investment","吸引","attract","attract foreign direct investment"],
  ["Economy","货币波动","currency fluctuation","剧烈的","sharp","sharp currency fluctuation","稳定","stabilize","stabilize currency fluctuations"],
  ["Economy","生活成本","cost of living","上涨的","rising","rising cost of living","降低","reduce","reduce the cost of living"],
  ["Economy","信贷消费","credit-based spending","过度的","excessive","excessive credit-based spending","抑制","discourage","discourage credit-based spending"],
  ["Economy","节俭","frugality","个人的","personal","personal frugality","践行","practice","practice frugality"],
  ["Economy","财务规划","financial planning","稳健的","sound","sound financial planning","改善","improve","improve financial planning"],
  ["Economy","储蓄意识","saving awareness","强烈的","strong","strong saving awareness","提高","raise","raise saving awareness"],
  ["Economy","金融素养","financial literacy","基本的","basic","basic financial literacy","提升","enhance","enhance financial literacy"],

  ["Arts","表演艺术","performing arts","传统的","traditional","traditional performing arts","推广","promote","promote performing arts"],
  ["Arts","即兴戏剧","improv theatre","实验性的","experimental","experimental improv theatre","上演","stage","stage improv theatre"],
  ["Arts","舞蹈表演","dance performances","现场的","live","live dance performances","参加","attend","attend dance performances"],
  ["Arts","戏剧表演","theatrical performances","专业的","professional","professional theatrical performances","观看","watch","watch theatrical performances"],
  ["Arts","视觉艺术","visual arts","当代的","contemporary","contemporary visual arts","欣赏","appreciate","appreciate visual arts"],
  ["Arts","抽象画","abstract painting","醒目的","striking","striking abstract painting","创作","create","create abstract paintings"],
  ["Arts","当代雕塑","contemporary sculpture","大型的","large-scale","large-scale contemporary sculpture","展出","exhibit","exhibit contemporary sculpture"],
  ["Arts","数字装置","digital installations","互动式的","interactive","interactive digital installations","设计","design","design digital installations"],
  ["Arts","沉浸式投影","immersive projections","大型的","large-scale","large-scale immersive projections","使用","use","use immersive projections"],
  ["Arts","抽象艺术","abstract art","现代的","modern","modern abstract art","解读","interpret","interpret abstract art"],
  ["Arts","当代艺术","contemporary art","创新的","innovative","innovative contemporary art","支持","support","support contemporary art"],
  ["Arts","在线流媒体平台","online streaming platforms","受欢迎的","popular","popular online streaming platforms","使用","use","use online streaming platforms"],
  ["Arts","金钱激励","monetary incentives","强有力的","strong","strong monetary incentives","提供","offer","offer monetary incentives"],
  ["Arts","按需访问","on-demand access","便利的","convenient","convenient on-demand access","提供","provide","provide on-demand access"],
  ["Arts","文化节","cultural festival","年度的","annual","annual cultural festival","组织","organize","organize a cultural festival"],
  ["Arts","粉丝文化","fan culture","强烈的","intense","intense fan culture","塑造","shape","shape fan culture"],
  ["Arts","全球系列","global franchise","成功的","successful","successful global franchise","打造","build","build a global franchise"],
  ["Arts","艺术价值","artistic value","持久的","lasting","lasting artistic value","认可","recognize","recognize artistic value"],
  ["Arts","文化认同","cultural identity","强烈的","strong","strong cultural identity","维护","preserve","preserve cultural identity"],
  ["Arts","原住民社区","indigenous community","本地的","local","local indigenous community","支持","support","support indigenous communities"],
  ["Arts","文化遗产保护","cultural heritage preservation","积极的","active","active cultural heritage preservation","资助","fund","fund cultural heritage preservation"],
  ["Arts","艺术自由","artistic freedom","完全的","complete","complete artistic freedom","保护","protect","protect artistic freedom"],
  ["Arts","社会评论","social commentary","犀利的","sharp","sharp social commentary","作出","offer","offer social commentary"]
];

const MICRO_CONTEXTS = [
  "education",
  "environment",
  "workplace",
  "government policy",
  "family life",
  "technology use",
  "public health",
  "urban life",
  "media influence",
  "personal finance"
];

const TOPIC_MICRO_CONTEXTS = {
  Technology: ["technology use", "education", "workplace", "public health"],
  Education: ["education", "technology use", "family life", "workplace"],
  Environment: ["environment", "government policy", "urban life", "public health"],
  Government: ["government policy", "urban life", "public health", "personal finance"],
  Society: ["family life", "urban life", "workplace", "government policy"],
  Health: ["public health", "family life", "technology use", "workplace"],
  Urbanization: ["urban life", "government policy", "environment", "personal finance"],
  Media: ["media influence", "technology use", "family life", "government policy"],
  Economy: ["personal finance", "workplace", "government policy", "urban life"],
  Arts: ["media influence", "education", "family life", "urban life"]
};

const CONTEXT_SCENES = {
  education: [
    "students in rural schools preparing for national exams",
    "teachers explaining abstract ideas through practical classroom tasks",
    "universities supporting first-year students during online courses"
  ],
  environment: [
    "city councils cutting emissions from daily commuting",
    "local communities restoring river habitats after heavy pollution",
    "energy planners reducing dependence on fossil fuels"
  ],
  workplace: [
    "managers coordinating remote teams during urgent projects",
    "employees learning new software before a workplace transition",
    "factories improving safety while updating production lines"
  ],
  "government policy": [
    "officials designing public spending rules before a budget debate",
    "lawmakers comparing evidence before introducing a new regulation",
    "public agencies explaining policy changes to taxpayers"
  ],
  "family life": [
    "parents setting screen-time rules for teenagers at home",
    "adult children arranging care for elderly relatives",
    "families balancing household costs after rent increases"
  ],
  "technology use": [
    "hospitals protecting patient data during online consultations",
    "users managing privacy settings on social media platforms",
    "schools adopting digital tools for after-class revision"
  ],
  "public health": [
    "local clinics reaching elderly residents before risks become emergencies",
    "health departments warning citizens during a flu outbreak",
    "doctors helping patients manage long-term lifestyle changes"
  ],
  "urban life": [
    "commuters moving through crowded bus stations during rush hour",
    "families searching for affordable housing near public transport",
    "city planners redesigning streets for pedestrians and cyclists"
  ],
  "media influence": [
    "readers checking misleading claims on social platforms",
    "teenagers comparing their lives with influencer content",
    "journalists explaining complex public issues to general audiences"
  ],
  "personal finance": [
    "young adults comparing loans before taking on debt",
    "households building emergency savings after a job loss",
    "workers deciding whether extra training is worth the cost"
  ]
};

const SYNONYM_DRAFTS = {
  important: [
    { term: "significant", zh: "重要的 / 显著的", tone: "更正式，适合 Task 2 学术写作。", stance: "Positive", microContext: "environment", example: "In environmental policy, significant public investment helps city councils reduce emissions from daily commuting." },
    { term: "crucial", zh: "关键的", tone: "强调决定性作用，常用于解决问题或防止风险。", stance: "Positive", microContext: "urban life", example: "In urban life, crucial transport planning reduces congestion around major bus stations during rush hour." },
    { term: "essential", zh: "必要的 / 不可缺少的", tone: "强调没有它就难以正常运转。", stance: "Positive", microContext: "education", example: "In education, essential reading support helps students in rural schools prepare for national exams." },
    { term: "vital", zh: "至关重要的", tone: "语气较强，适合健康、安全、环境等问题。", stance: "Positive", microContext: "public health", example: "In public health, vital vaccination services protect elderly residents during a flu outbreak." }
  ],
  significant: [
    { term: "substantial", zh: "大量的 / 实质性的", tone: "比 important 更强调规模或影响。", stance: "Positive" },
    { term: "notable", zh: "值得注意的", tone: "语气较稳，适合描述变化或差异。", stance: "Neutral" },
    { term: "meaningful", zh: "有意义的", tone: "强调对个人或社会的实际价值。", stance: "Positive" }
  ],
  rapid: [
    { term: "swift", zh: "迅速的", tone: "简洁直接，适合描述反应或变化速度。", stance: "Neutral" },
    { term: "accelerated", zh: "加速的", tone: "强调变化速度正在变快，常用于科技或城市发展。", stance: "Neutral" },
    { term: "prompt", zh: "及时的", tone: "更适合回应、服务或行动。", stance: "Positive" }
  ],
  "cutting-edge": [
    { term: "state-of-the-art", zh: "最先进的", tone: "更正式，适合科技、医疗和教育设备。", stance: "Positive" },
    { term: "advanced", zh: "先进的", tone: "通用且稳妥，正式程度中等。", stance: "Positive" },
    { term: "next-generation", zh: "下一代的", tone: "强调未来感，适合创新产品。", stance: "Positive" }
  ],
  innovative: [
    { term: "inventive", zh: "有创造力的", tone: "强调想法新颖，适合艺术、教育和产品设计。", stance: "Positive" },
    { term: "original", zh: "原创的", tone: "强调不照搬，适合文化和媒体话题。", stance: "Positive" },
    { term: "forward-looking", zh: "有前瞻性的", tone: "强调面向未来，适合政策和商业。", stance: "Positive" }
  ],
  effective: [
    { term: "efficient", zh: "高效的", tone: "强调用更少资源获得结果。", stance: "Positive" },
    { term: "practical", zh: "实用的", tone: "强调可执行，而不是理论上好听。", stance: "Positive" },
    { term: "workable", zh: "可行的", tone: "语气克制，适合政策建议。", stance: "Neutral" }
  ],
  serious: [
    { term: "severe", zh: "严重的", tone: "比 serious 更强，常用于健康、污染和犯罪。", stance: "Negative" },
    { term: "grave", zh: "严峻的", tone: "更正式，强调后果重大。", stance: "Negative" },
    { term: "worrying", zh: "令人担忧的", tone: "强调风险正在引起关注。", stance: "Negative" }
  ],
  severe: [
    { term: "acute", zh: "严重而紧迫的", tone: "强调问题已经很急迫。", stance: "Negative" },
    { term: "intense", zh: "强烈的", tone: "适合压力、竞争和情绪。", stance: "Negative" },
    { term: "grave", zh: "严峻的", tone: "正式，适合社会或公共政策问题。", stance: "Negative" }
  ],
  excessive: [
    { term: "unreasonable", zh: "不合理的", tone: "强调超过合理范围。", stance: "Negative" },
    { term: "disproportionate", zh: "不成比例的", tone: "更正式，适合政策或资源分配。", stance: "Negative" },
    { term: "overly high", zh: "过高的", tone: "更口语但清晰，适合费用、税收和压力。", stance: "Negative" }
  ],
  strong: [
    { term: "robust", zh: "强有力的 / 稳健的", tone: "更正式，常用于制度、证据和系统。", stance: "Positive" },
    { term: "powerful", zh: "强大的", tone: "强调影响力，适合媒体、科技或政策。", stance: "Neutral" },
    { term: "solid", zh: "扎实的", tone: "强调基础可靠，语气稳健。", stance: "Positive" }
  ],
  accessible: [
    { term: "available", zh: "可获得的", tone: "强调资源存在并能被使用。", stance: "Positive" },
    { term: "affordable", zh: "负担得起的", tone: "强调价格门槛低。", stance: "Positive" },
    { term: "easy-to-reach", zh: "容易接触到的", tone: "较口语，适合服务和设施。", stance: "Positive" }
  ],
  widespread: [
    { term: "prevalent", zh: "普遍存在的", tone: "正式，常用于社会问题。", stance: "Negative" },
    { term: "extensive", zh: "广泛的", tone: "中性，强调覆盖范围大。", stance: "Neutral" },
    { term: "common", zh: "常见的", tone: "简单直接，适合基础表达。", stance: "Neutral" }
  ],
  "large-scale": [
    { term: "extensive", zh: "大范围的", tone: "正式，强调覆盖面。", stance: "Neutral" },
    { term: "wide-ranging", zh: "范围广的", tone: "适合政策、改革和影响。", stance: "Neutral" },
    { term: "mass", zh: "大规模的", tone: "常用于生产、媒体或社会行动。", stance: "Neutral" }
  ],
  practical: [
    { term: "hands-on", zh: "动手实践的", tone: "适合教育和职业培训。", stance: "Positive" },
    { term: "real-world", zh: "贴近现实的", tone: "强调可用于真实场景。", stance: "Positive" },
    { term: "useful", zh: "有用的", tone: "简单直接，正式程度较低。", stance: "Positive" }
  ],
  strict: [
    { term: "tough", zh: "严格的 / 强硬的", tone: "更强硬，适合法律和监管。", stance: "Neutral" },
    { term: "rigorous", zh: "严谨的", tone: "更正式，强调标准和程序。", stance: "Positive" },
    { term: "firm", zh: "坚定的", tone: "强调执行力度。", stance: "Neutral" }
  ],
  fair: [
    { term: "equitable", zh: "公平合理的", tone: "更正式，适合教育、福利和资源分配。", stance: "Positive" },
    { term: "impartial", zh: "公正无偏的", tone: "强调不偏袒，适合法律和评估。", stance: "Positive" },
    { term: "balanced", zh: "平衡的", tone: "强调兼顾不同利益。", stance: "Neutral" }
  ],
  flexible: [
    { term: "adaptable", zh: "可调整的", tone: "强调能适应变化。", stance: "Positive" },
    { term: "versatile", zh: "用途多样的", tone: "强调功能多。", stance: "Positive" },
    { term: "adjustable", zh: "可调节的", tone: "具体，适合制度、时间表或工具。", stance: "Neutral" }
  ],
  reliable: [
    { term: "dependable", zh: "可靠的", tone: "强调可以信赖。", stance: "Positive" },
    { term: "trustworthy", zh: "值得信任的", tone: "强调道德和信任。", stance: "Positive" },
    { term: "consistent", zh: "稳定一致的", tone: "强调表现稳定。", stance: "Positive" }
  ],
  personalized: [
    { term: "tailored", zh: "量身定制的", tone: "正式，适合教育、医疗和服务。", stance: "Positive" },
    { term: "customized", zh: "定制化的", tone: "中性，适合产品和服务。", stance: "Positive" },
    { term: "individualized", zh: "个体化的", tone: "正式，常用于教育和医疗。", stance: "Positive" }
  ],
  advanced: [
    { term: "sophisticated", zh: "复杂先进的", tone: "强调技术或系统复杂度。", stance: "Positive" },
    { term: "modern", zh: "现代的", tone: "通用，正式程度中等。", stance: "Neutral" },
    { term: "highly developed", zh: "高度发达的", tone: "正式，强调成熟度。", stance: "Positive" }
  ],
  mandatory: [
    { term: "compulsory", zh: "强制的", tone: "正式，常用于教育和法律。", stance: "Neutral" },
    { term: "required", zh: "必需的", tone: "清晰直接。", stance: "Neutral" },
    { term: "obligatory", zh: "有义务的", tone: "更正式，常用于制度要求。", stance: "Neutral" }
  ],
  global: [
    { term: "international", zh: "国际的", tone: "强调国家之间。", stance: "Neutral" },
    { term: "worldwide", zh: "世界范围的", tone: "强调覆盖全球。", stance: "Neutral" },
    { term: "cross-border", zh: "跨境的", tone: "适合贸易、犯罪和合作。", stance: "Neutral" }
  ],
  reduce: [
    { term: "cut", zh: "削减 / 减少", tone: "更直接，适合成本、排放和浪费。", stance: "Positive" },
    { term: "lower", zh: "降低", tone: "适合价格、风险、血压等可量化对象。", stance: "Positive" },
    { term: "minimize", zh: "最小化", tone: "更正式，强调降到最低。", stance: "Positive" }
  ],
  prevent: [
    { term: "stop", zh: "阻止", tone: "直接，但正式程度较低。", stance: "Positive" },
    { term: "avert", zh: "避免 / 防止", tone: "正式，常用于危机或风险。", stance: "Positive" },
    { term: "reduce the risk of", zh: "降低……风险", tone: "更谨慎，不承诺完全避免。", stance: "Positive" }
  ],
  promote: [
    { term: "encourage", zh: "鼓励", tone: "强调让人愿意去做。", stance: "Positive" },
    { term: "support", zh: "支持", tone: "语气稳，适合政策和资源。", stance: "Positive" },
    { term: "advance", zh: "推进", tone: "更正式，强调向前发展。", stance: "Positive" }
  ],
  use: [
    { term: "apply", zh: "应用", tone: "更正式，适合技术、方法和政策。", stance: "Neutral" },
    { term: "employ", zh: "采用 / 使用", tone: "比 use 更正式。", stance: "Neutral" },
    { term: "make use of", zh: "利用", tone: "强调把资源用起来。", stance: "Neutral" }
  ],
  provide: [
    { term: "offer", zh: "提供", tone: "服务语境中自然。", stance: "Positive" },
    { term: "supply", zh: "供应", tone: "适合资源、设备和资金。", stance: "Neutral" },
    { term: "deliver", zh: "交付 / 提供", tone: "适合公共服务和结果。", stance: "Positive" }
  ],
  combat: [
    { term: "fight", zh: "对抗", tone: "直接有力，但略口语。", stance: "Negative" },
    { term: "counter", zh: "反制", tone: "正式，适合网络犯罪和虚假信息。", stance: "Negative" },
    { term: "address", zh: "处理 / 应对", tone: "更温和，适合政策建议。", stance: "Neutral" }
  ],
  tackle: [
    { term: "address", zh: "处理 / 解决", tone: "正式稳妥，适合 Task 2。", stance: "Neutral" },
    { term: "deal with", zh: "处理", tone: "较口语，但清楚。", stance: "Neutral" },
    { term: "confront", zh: "直面", tone: "更强烈，适合严重问题。", stance: "Negative" }
  ],
  improve: [
    { term: "enhance", zh: "提升", tone: "更正式，适合质量、能力和服务。", stance: "Positive" },
    { term: "upgrade", zh: "升级", tone: "适合设施、系统和技术。", stance: "Positive" },
    { term: "strengthen", zh: "加强", tone: "适合制度、能力和保障。", stance: "Positive" }
  ],
  encourage: [
    { term: "motivate", zh: "激励", tone: "强调内在动力。", stance: "Positive" },
    { term: "foster", zh: "培养 / 促进", tone: "更正式，适合教育和价值观。", stance: "Positive" },
    { term: "support", zh: "支持", tone: "强调提供条件。", stance: "Positive" }
  ],
  strengthen: [
    { term: "reinforce", zh: "强化", tone: "正式，强调使原有系统更稳。", stance: "Positive" },
    { term: "build up", zh: "逐步加强", tone: "较口语，但适合能力建设。", stance: "Positive" },
    { term: "consolidate", zh: "巩固", tone: "更正式，适合制度和成果。", stance: "Positive" }
  ],
  protect: [
    { term: "safeguard", zh: "保护 / 捍卫", tone: "正式，适合权利、安全和隐私。", stance: "Positive" },
    { term: "preserve", zh: "保护 / 维护", tone: "常用于文化、环境和传统。", stance: "Positive" },
    { term: "defend", zh: "防卫 / 捍卫", tone: "更强烈，适合权利或主权。", stance: "Positive" }
  ],
  develop: [
    { term: "create", zh: "创造 / 开发", tone: "通用，强调从无到有。", stance: "Positive" },
    { term: "build", zh: "建立 / 打造", tone: "适合系统、平台和能力。", stance: "Positive" },
    { term: "design", zh: "设计", tone: "强调有计划地开发。", stance: "Positive" }
  ],
  adopt: [
    { term: "introduce", zh: "引入", tone: "适合学校、政府和公司开始使用新做法。", stance: "Neutral" },
    { term: "implement", zh: "实施", tone: "更正式，强调落地执行。", stance: "Positive" },
    { term: "take up", zh: "开始采用", tone: "较口语，适合个人或机构。", stance: "Neutral" }
  ],
  expand: [
    { term: "extend", zh: "扩展", tone: "适合服务范围和覆盖面。", stance: "Positive" },
    { term: "broaden", zh: "拓宽", tone: "适合机会、选择和视野。", stance: "Positive" },
    { term: "scale up", zh: "扩大规模", tone: "适合项目和政策试点。", stance: "Positive" }
  ],
  implement: [
    { term: "carry out", zh: "执行", tone: "较直接，适合计划和措施。", stance: "Neutral" },
    { term: "put into practice", zh: "付诸实践", tone: "强调从想法到执行。", stance: "Positive" },
    { term: "enforce", zh: "执行 / 强制实施", tone: "更强硬，适合法律法规。", stance: "Neutral" }
  ],
  address: [
    { term: "tackle", zh: "解决 / 应对", tone: "更有行动感，适合社会问题。", stance: "Neutral" },
    { term: "respond to", zh: "回应", tone: "强调根据问题作出反应。", stance: "Neutral" },
    { term: "deal with", zh: "处理", tone: "清楚但较口语。", stance: "Neutral" }
  ]
};

const SYNONYM_FALLBACKS = {
  adjective: [
    { term: "meaningful", zh: "有实际意义的", tone: "通用替代表达，适合强调实际价值。", stance: "Positive" },
    { term: "notable", zh: "值得注意的", tone: "语气稳，适合描述变化、影响或特征。", stance: "Neutral" },
    { term: "well-targeted", zh: "有针对性的", tone: "适合政策、服务和学习策略。", stance: "Positive" }
  ],
  verb: [
    { term: "support", zh: "支持", tone: "通用且稳妥，适合政策、教育和服务语境。", stance: "Positive" },
    { term: "improve", zh: "改善 / 提升", tone: "适合提出正向结果。", stance: "Positive" },
    { term: "address", zh: "处理 / 应对", tone: "适合问题解决型论述。", stance: "Neutral" }
  ]
};

const GENERIC_SENTENCE_PATTERNS = [
  /\bin modern society\b/i,
  /\bnowadays\b/i,
  /\bplays? an? important role\b/i,
  /\bis very important\b/i,
  /\bcan help people\b/i,
  /\bhas many benefits\b/i,
  /\bmake our life better\b/i
];

const QUALITY_REVIEW_REPORT = {
  reviewedOptions: 0,
  rewrittenOptions: 0,
  issueCounts: {}
};

function normalizeSynonymKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s*\/\s*.*/, "")
    .replace(/^highly\s+/, "")
    .trim();
}

function pickMicroContext(topic, seedText) {
  const pool = TOPIC_MICRO_CONTEXTS[topic] || MICRO_CONTEXTS;
  const seed = Array.from(String(seedText || topic)).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return pool[seed % pool.length];
}

function pickScene(context, seedText) {
  const scenes = CONTEXT_SCENES[context] || CONTEXT_SCENES.education;
  const seed = Array.from(String(seedText || context)).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return scenes[seed % scenes.length];
}

function getSynonymDrafts(term, type) {
  const key = normalizeSynonymKey(term);
  return SYNONYM_DRAFTS[key] || SYNONYM_FALLBACKS[type] || SYNONYM_FALLBACKS.adjective;
}

function replaceFirstWordPhrase(text, from, to) {
  const source = String(text || "");
  const pattern = new RegExp(`^${escapeRegExp(String(from || ""))}(\\b|\\s|$)`, "i");
  if (pattern.test(source)) return source.replace(pattern, `${to}$1`).replace(/\s+/g, " ").trim();
  return source.replace(new RegExp(escapeRegExp(String(from || "")), "i"), to).replace(/\s+/g, " ").trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildAlternativeExpression(card, synonymTerm) {
  if (card.type === "adjective") {
    return replaceFirstWordPhrase(card.backEnglish, card.highlightEnglish, synonymTerm);
  }
  return replaceFirstWordPhrase(card.backEnglish, card.highlightEnglish, synonymTerm);
}

function buildExampleSubject(card, phrase) {
  if (card.type === "verb") return `efforts to ${phrase}`;
  return phrase;
}

function createMicroContextExample(card, option, phrase, context) {
  const subject = buildExampleSubject(card, phrase);
  const scene = pickScene(context, `${card.topic}-${phrase}-${option.term}`);
  const endings = {
    education: "give learners clearer practice instead of another abstract explanation",
    environment: "turn a broad environmental goal into visible local action",
    workplace: "reduce delays when teams have to finish a project under pressure",
    "government policy": "make a public decision easier for ordinary citizens to understand",
    "family life": "help households make a concrete choice instead of relying on vague advice",
    "technology use": "solve a practical problem without adding unnecessary digital stress",
    "public health": "reach vulnerable residents before a small risk becomes a wider crisis",
    "urban life": "improve daily routines for commuters, tenants, and local businesses",
    "media influence": "help audiences judge information more carefully before sharing it",
    "personal finance": "help young adults make safer choices before they borrow or spend money"
  };
  return `In ${context}, ${subject} can help ${scene} ${endings[context]}.`;
}

function hasMicroContext(example, context) {
  const lower = String(example || "").toLowerCase();
  if (lower.includes(`in ${context}`)) return true;
  return (CONTEXT_SCENES[context] || []).some((scene) => lower.includes(scene.toLowerCase().split(" ").slice(0, 3).join(" ")));
}

function reviewSynonymOption(card, option, phrase, usedOpenings) {
  const issues = [];
  const example = String(option.example || "");
  const context = option.microContext || pickMicroContext(card.topic, phrase);
  const opening = example.split(/\s+/).slice(0, 4).join(" ").toLowerCase();
  if (!example) issues.push("missing-example");
  if (!hasMicroContext(example, context)) issues.push("missing-micro-context");
  if (!example.toLowerCase().includes(String(option.term || "").toLowerCase().split(" ")[0])) issues.push("missing-synonym");
  if (GENERIC_SENTENCE_PATTERNS.some((pattern) => pattern.test(example))) issues.push("generic-template");
  if (opening && usedOpenings.has(opening)) issues.push("repeated-opening");
  return { passed: issues.length === 0, issues, context, opening };
}

function noteQualityIssues(issues) {
  issues.forEach((issue) => {
    QUALITY_REVIEW_REPORT.issueCounts[issue] = (QUALITY_REVIEW_REPORT.issueCounts[issue] || 0) + 1;
  });
}

function reviewAndRewriteSynonymOptions(card, drafts) {
  const usedOpenings = new Set();
  return drafts.slice(0, 4).map((draft) => {
    QUALITY_REVIEW_REPORT.reviewedOptions += 1;
    const phrase = buildAlternativeExpression(card, draft.term);
    const microContext = draft.microContext || pickMicroContext(card.topic, `${card.backEnglish}-${draft.term}`);
    let option = { ...draft, phrase, microContext };
    let review = reviewSynonymOption(card, option, phrase, usedOpenings);
    if (!review.passed) {
      noteQualityIssues(review.issues);
      QUALITY_REVIEW_REPORT.rewrittenOptions += 1;
      option = {
        ...option,
        example: createMicroContextExample(card, option, phrase, microContext),
        reviewNote: "Self-reviewed and rewritten for micro-context, specificity, and non-template phrasing."
      };
      review = reviewSynonymOption(card, option, phrase, usedOpenings);
    } else {
      option.reviewNote = "Self-reviewed for micro-context and template repetition.";
    }
    if (review.opening) usedOpenings.add(review.opening);
    option.reviewPassed = review.passed;
    option.reviewIssues = review.issues;
    return option;
  });
}

function buildSynonymNetworks(card) {
  const drafts = getSynonymDrafts(card.highlightEnglish, card.type);
  return [
    {
      core: card.highlightEnglish,
      coreExpression: card.backEnglish,
      role: card.type,
      options: reviewAndRewriteSynonymOptions(card, drafts)
    }
  ];
}

function makeCard(row, kind) {
  const [topic, baseChinese, baseEnglish, adjChinese, adjHighlight, adjEnglish, verbChinese, verbHighlight, verbEnglish] = row;
  const isAdjective = kind === "adjective";
  const highlightChinese = isAdjective ? adjChinese : verbChinese;
  const highlightEnglish = isAdjective ? adjHighlight : verbHighlight;
  const backEnglish = isAdjective ? adjEnglish : verbEnglish;
  const card = {
    topic,
    baseChinese,
    baseEnglish,
    type: isAdjective ? "adjective" : "verb",
    frontChinese: `${highlightChinese}${baseChinese}`,
    backEnglish,
    highlightChinese,
    highlightEnglish
  };
  card.synonymNetworks = buildSynonymNetworks(card);
  return card;
}

window.FLASHCARD_DATA = BASE_ENTRIES.flatMap((row) => [
  makeCard(row, "adjective"),
  makeCard(row, "verb")
]);
window.FLASHCARD_GENERATION_REVIEW = QUALITY_REVIEW_REPORT;
