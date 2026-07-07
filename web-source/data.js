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
  ["Education","作文","essays","模板化的","template-based","template-based essays","撰写","write","write essays"],
  ["Education","作文计划","essay plans","公式化的","formulaic","formulaic essay plans","制定","develop","develop essay plans"],
  ["Education","自己的论点","own arguments","有说服力的","convincing","convincing arguments","形成","form","form own arguments"],
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

const EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS = {
  "Education::adjective::strong civic awareness": [
    { term: "well-developed", pattern: "well-developed civic awareness", zh: "发展良好的公民意识", tone: "这条搭配适合在 IELTS 教育题中强调学生能够理解公共议题、遵守规则并参与社区事务。", stance: "Positive" },
    { term: "basic", pattern: "basic civic awareness", zh: "基本的公民意识", tone: "这条搭配适合中性描述学生对权利、义务、公共规则和社会参与有基础认识。", stance: "Neutral" },
    { term: "weak", pattern: "weak civic awareness", zh: "薄弱的公民意识", tone: "这条搭配适合批评教育忽视公共责任，导致学生对社区问题、规则意识和社会参与缺少关注。", stance: "Negative" }
  ],

  "Education::verb::raise civic awareness": [
    { term: "promote", pattern: "promote civic awareness among students", zh: "提升学生的公民意识", tone: "这条搭配适合在 IELTS 教育题中强调学校通过课程、讨论和社区活动帮助学生理解公共责任。", stance: "Positive" },
    { term: "teach", pattern: "teach civic responsibilities", zh: "教授公民责任", tone: "这条搭配适合中性描述学校向学生讲解权利义务、公共规则和参与社会的基本方式。", stance: "Neutral" },
    { term: "neglect", pattern: "neglect civic education", zh: "忽视公民教育", tone: "这条搭配适合批评学校只关注考试成绩，却没有系统培养学生的公共意识和社会责任。", stance: "Negative" }
  ],

  "Education::adjective::adequate career preparation": [
    { term: "workplace-oriented", pattern: "workplace-oriented career preparation", zh: "面向职场的职业准备", tone: "这条搭配适合在 IELTS 教育题中强调学校帮助学生理解真实工作环境、职业技能和岗位要求。", stance: "Positive" },
    { term: "school-based", pattern: "school-based career preparation", zh: "校内职业准备", tone: "这条搭配适合中性描述学校通过课程、讲座或咨询提供职业规划支持。", stance: "Neutral" },
    { term: "inadequate", pattern: "inadequate career preparation", zh: "不足的职业准备", tone: "这条搭配适合批评学校没有帮助学生了解就业市场、职业路径或实际工作技能。", stance: "Negative" }
  ],

  "Education::verb::provide career preparation": [
    { term: "offer", pattern: "offer career guidance", zh: "提供职业指导", tone: "这条搭配适合在 IELTS 教育题中强调学校通过咨询、实习信息和职业规划帮助学生过渡到工作世界。", stance: "Positive" },
    { term: "arrange", pattern: "arrange work-experience placements", zh: "安排工作体验岗位", tone: "这条搭配适合中性描述学校为学生联系短期实习、职业体验或工作观察机会。", stance: "Neutral" },
    { term: "leave", pattern: "leave students unprepared for employment", zh: "让学生对就业毫无准备", tone: "这条搭配适合批评教育只重知识输入，却没有培养学生进入职场所需的技能、信息和信心。", stance: "Negative" }
  ],

  "Education::adjective::rapidly rising tuition fees": [
    { term: "affordable", pattern: "affordable tuition fees", zh: "负担得起的学费", tone: "这条搭配适合在 IELTS 教育题中强调学费保持在合理水平，学生不会因经济压力失去受教育机会。", stance: "Positive" },
    { term: "annual", pattern: "annual tuition fees", zh: "年度学费", tone: "这条搭配适合中性描述学生或家庭每年需要支付的教育费用。", stance: "Neutral" },
    { term: "soaring", pattern: "soaring tuition fees", zh: "飙升的学费", tone: "这条搭配适合批评学费快速上涨给家庭造成负担，并可能扩大教育不平等。", stance: "Negative" }
  ],

  "Education::verb::control tuition fees": [
    { term: "cap", pattern: "cap tuition fee increases", zh: "限制学费涨幅", tone: "这条搭配适合在 IELTS 教育题中强调政府或学校通过设定上限防止学费过快上涨。", stance: "Positive" },
    { term: "review", pattern: "review tuition fee levels", zh: "审查学费水平", tone: "这条搭配适合中性描述教育部门或学校定期评估学费是否与成本、质量和公平性相匹配。", stance: "Neutral" },
    { term: "allow", pattern: "allow tuition fees to spiral", zh: "任由学费失控上涨", tone: "这条搭配适合批评监管不足导致学费不断攀升，最终把低收入学生排除在外。", stance: "Negative" }
  ],

  "Education::adjective::serious unequal distribution of educational resources": [
    { term: "equitable", pattern: "equitable distribution of educational resources", zh: "教育资源的公平分配", tone: "这条搭配适合在 IELTS 教育题中强调不同地区和学校应较公平地获得师资、设施和学习支持。", stance: "Positive" },
    { term: "regional", pattern: "regional distribution of educational resources", zh: "教育资源的区域分布", tone: "这条搭配适合中性描述教育资源在城市、农村或不同地区之间的分布状况。", stance: "Neutral" },
    { term: "uneven", pattern: "uneven distribution of educational resources", zh: "教育资源分配不均", tone: "这条搭配适合批评师资、资金和设施过度集中在少数学校或地区。", stance: "Negative" }
  ],

  "Education::verb::address unequal distribution of educational resources": [
    { term: "redistribute", pattern: "redistribute educational resources more fairly", zh: "更公平地重新分配教育资源", tone: "这条搭配适合在 IELTS 教育题中强调政府把资金、优秀教师和设施向薄弱地区倾斜。", stance: "Positive" },
    { term: "map", pattern: "map disparities in educational resources", zh: "梳理教育资源差距", tone: "这条搭配适合中性描述政策制定者先识别哪些地区、学校或群体资源不足。", stance: "Neutral" },
    { term: "entrench", pattern: "entrench unequal access to educational resources", zh: "固化教育资源获取不平等", tone: "这条搭配适合批评政策或资金分配方式反而让资源优势长期集中在少数群体手中。", stance: "Negative" }
  ],

  "Education::adjective::early dropout": [
    { term: "preventable", pattern: "preventable school dropout", zh: "可预防的辍学", tone: "这条搭配适合在 IELTS 教育题中强调辍学往往可以通过经济支持、学习辅导和家庭干预来减少。", stance: "Positive" },
    { term: "student", pattern: "student dropout", zh: "学生辍学", tone: "这条搭配适合中性描述学生离开学校或停止完成学业这一教育现象。", stance: "Neutral" },
    { term: "early", pattern: "early school dropout", zh: "过早辍学", tone: "这条搭配适合批评学生在基础教育阶段过早离校，影响未来就业、收入和社会流动。", stance: "Negative" }
  ],

  "Education::verb::prevent dropout": [
    { term: "reduce", pattern: "reduce dropout rates", zh: "降低辍学率", tone: "这条搭配适合在 IELTS 教育题中强调学校通过补助、辅导和心理支持让更多学生留在教育体系中。", stance: "Positive" },
    { term: "monitor", pattern: "monitor dropout risks", zh: "监测辍学风险", tone: "这条搭配适合中性描述学校识别缺勤、成绩下滑或家庭压力等可能导致辍学的信号。", stance: "Neutral" },
    { term: "ignore", pattern: "ignore early warning signs of dropout", zh: "忽视辍学的早期预警信号", tone: "这条搭配适合批评学校没有及时回应学生长期缺勤、学习困难或经济压力，最终导致辍学。", stance: "Negative" }
  ],

  "Education::adjective::persistent school bullying": [
    { term: "effective", pattern: "effective anti-bullying measures", zh: "有效的反霸凌措施", tone: "这条搭配适合在 IELTS 教育题中强调学校有清晰机制处理霸凌，包括举报、干预和持续跟进。", stance: "Positive" },
    { term: "reported", pattern: "reported school bullying", zh: "被报告的校园霸凌", tone: "这条搭配适合中性描述已经被学生、家长或教师正式反映出来的霸凌事件。", stance: "Neutral" },
    { term: "persistent", pattern: "persistent school bullying", zh: "持续存在的校园霸凌", tone: "这条搭配适合批评学校治理不足，导致霸凌反复发生并长期伤害学生安全感。", stance: "Negative" }
  ],

  "Education::verb::tackle school bullying": [
    { term: "implement", pattern: "implement anti-bullying policies", zh: "实施反霸凌政策", tone: "这条搭配适合在 IELTS 教育题中强调学校通过明确规则、举报渠道和干预流程保护学生。", stance: "Positive" },
    { term: "investigate", pattern: "investigate bullying incidents", zh: "调查霸凌事件", tone: "这条搭配适合中性描述学校在收到举报后核实事实、听取多方陈述并记录处理过程。", stance: "Neutral" },
    { term: "dismiss", pattern: "dismiss bullying as harmless teasing", zh: "把霸凌轻描淡写成无害玩笑", tone: "这条搭配适合批评教师或学校低估霸凌伤害，导致受害学生得不到保护。", stance: "Negative" }
  ],

  "Education::adjective::excessive commercialization of education": [
    { term: "responsible", pattern: "responsible private investment in education", zh: "负责任的私人教育投资", tone: "这条搭配适合在 IELTS 教育题中承认适度投资可以改善设施和课程，但前提是不能损害公平性。", stance: "Positive" },
    { term: "private", pattern: "private-sector involvement in education", zh: "私营部门参与教育", tone: "这条搭配适合中性描述企业、培训机构或社会资本参与教育服务供给。", stance: "Neutral" },
    { term: "excessive", pattern: "excessive commercialization of education", zh: "过度的教育商品化", tone: "这条搭配适合批评教育被过度当作商品出售，学生和家庭被迫为基本学习机会支付高额费用。", stance: "Negative" }
  ],

  "Education::verb::criticize commercialization of education": [
    { term: "regulate", pattern: "regulate profit-making education providers", zh: "监管营利性教育机构", tone: "这条搭配适合在 IELTS 教育题中强调政府应限制逐利行为，保护学生和家长免受过度收费或虚假宣传影响。", stance: "Positive" },
    { term: "debate", pattern: "debate the role of private providers in education", zh: "讨论私营教育提供者的作用", tone: "这条搭配适合中性描述社会围绕私营机构在教育体系中的边界和责任展开讨论。", stance: "Neutral" },
    { term: "prioritize", pattern: "prioritize profit over educational value", zh: "把利润置于教育价值之上", tone: "这条搭配适合批评教育机构过度商业化，把收费、营销和扩张放在学生学习质量之前。", stance: "Negative" }
  ],

  "Education::adjective::serious degree inflation": [
    { term: "skills-based", pattern: "skills-based hiring", zh: "基于技能的招聘", tone: "这条搭配适合在 IELTS 教育题中提出缓解学历贬值的方向，即雇主不只看文凭，也重视真实能力。", stance: "Positive" },
    { term: "credential", pattern: "credential requirements", zh: "学历要求", tone: "这条搭配适合中性描述岗位、学校或机构对学历证书设置的门槛。", stance: "Neutral" },
    { term: "degree", pattern: "degree inflation", zh: "学历贬值", tone: "这条搭配适合批评越来越多岗位要求更高文凭，导致学历门槛上升而实际能力未必提高。", stance: "Negative" }
  ],

  "Education::verb::reduce degree inflation": [
    { term: "value", pattern: "value practical skills over credentials", zh: "重视实践技能而非单纯文凭", tone: "这条搭配适合在 IELTS 教育题中强调学校和雇主应把真实能力放在学历标签之前。", stance: "Positive" },
    { term: "review", pattern: "review credential requirements", zh: "审查学历要求", tone: "这条搭配适合中性描述雇主或高校重新评估某些岗位和课程是否真的需要高学历门槛。", stance: "Neutral" },
    { term: "inflate", pattern: "inflate degree requirements", zh: "抬高学历要求", tone: "这条搭配适合批评机构不断提高文凭门槛，使学历贬值问题进一步恶化。", stance: "Negative" }
  ],

  "Education::adjective::mandatory compulsory course": [
    { term: "core", pattern: "core compulsory course", zh: "核心必修课程", tone: "这条搭配适合在 IELTS 教育题里强调某门课被视为基础素养的一部分，因此学校要求所有学生都必须学习。", stance: "Positive" },
    { term: "requirement", pattern: "compulsory course requirement", zh: "必修课程要求", tone: "这条搭配适合在社会教育语境里客观说明学校或教育部门对毕业、升学或课程结构设置的硬性要求。", stance: "Neutral" },
    { term: "inflexible requirement", pattern: "inflexible compulsory course requirement", zh: "缺乏弹性的必修课要求", tone: "这条搭配适合在 IELTS 论证中批评必修课要求过于僵硬，限制了学生根据兴趣、能力和未来方向选择课程的空间。", stance: "Negative" }
  ],

  "Education::verb::choose an elective course": [
    { term: "choose a relevant", pattern: "choose a relevant elective course", zh: "选择一门契合自身需求的选修课", tone: "这条搭配适合在 IELTS 教育题里强调学生根据未来专业方向、职业目标或个人兴趣做出更有价值的课程选择。", stance: "Positive" },
    { term: "register for", pattern: "register for an elective course", zh: "注册一门选修课", tone: "这条搭配适合在学校选课或课程安排的语境里中性描述学生完成选修课报名这一行为。", stance: "Neutral" },
    { term: "be pushed into", pattern: "be pushed into an unsuitable elective course", zh: "被迫选上一门不合适的选修课", tone: "这条搭配适合在 IELTS 讨论中批评排课制度或升学压力让学生无法真正按兴趣选课，最后只能接受并不适合自己的课程。", stance: "Negative" }
  ],

  "Education::adjective::intense exam pressure": [
    { term: "manageable", pattern: "manageable exam pressure", zh: "可控的考试压力", tone: "这条搭配适合在 IELTS 论证里承认适度压力可以督促学生复习，但前提是压力仍然处于能够承受和自我调节的范围内。", stance: "Positive" },
    { term: "exam-related", pattern: "exam-related stress", zh: "与考试相关的压力", tone: "这条搭配适合在社会教育语境里客观描述学生在备考阶段常见的情绪负担，而不预设这种压力一定完全正面或负面。", stance: "Neutral" },
    { term: "crippling", pattern: "crippling exam pressure", zh: "令人不堪重负的考试压力", tone: "这条搭配适合在 IELTS 教育题里批评分数竞争过强，把学生推向失眠、焦虑和学习倦怠。", stance: "Negative" }
  ],

  "Education::verb::reduce test anxiety": [
    { term: "ease", pattern: "ease test anxiety", zh: "缓解考试焦虑", tone: "这条搭配适合在 IELTS 讨论中强调学校通过辅导、合理评估或更健康的课堂氛围来帮助学生减轻考试带来的紧张感。", stance: "Positive" },
    { term: "monitor", pattern: "monitor test anxiety", zh: "监测考试焦虑", tone: "这条搭配适合在教育管理或学生支持语境里中性说明学校持续关注学生的焦虑水平并据此调整干预措施。", stance: "Neutral" },
    { term: "heighten", pattern: "heighten test anxiety", zh: "加剧考试焦虑", tone: "这条搭配适合在 IELTS 教育题里批评过度排名、频繁测验或家长期待反而把考试焦虑越推越高。", stance: "Negative" }
  ],

  "Education::adjective::nationwide standardized testing": [
    { term: "reliable", pattern: "reliable standardized testing", zh: "可靠的标准化考试", tone: "这条搭配适合在 IELTS 论证中强调统一考试如果设计得当，确实能提供较稳定的比较标准，帮助高校或政府进行大范围筛选。", stance: "Positive" },
    { term: "large-scale", pattern: "large-scale standardized testing", zh: "大规模标准化考试", tone: "这条搭配适合在社会教育语境里客观描述覆盖全国或多个地区的统一测评安排。", stance: "Neutral" },
    { term: "high-stakes", pattern: "high-stakes standardized testing", zh: "影响重大的标准化考试", tone: "这条搭配适合在 IELTS 教育题里批评一次影响重大的考试对升学和资源分配作用过大，从而放大焦虑和不公平。", stance: "Negative" }
  ],

  "Education::verb::reform standardized testing": [
    { term: "make", pattern: "make standardized tests fairer", zh: "让标准化考试更公平", tone: "这条搭配适合在 IELTS 讨论中强调改革的目标不是取消一切考试，而是修正题型、评分和机会分配中的不公。", stance: "Positive" },
    { term: "pilot", pattern: "pilot standardized testing reforms", zh: "试点标准化考试改革", tone: "这条搭配适合在教育政策语境里中性描述先在部分地区或学校测试改革方案，再决定是否全面推广。", stance: "Neutral" },
    { term: "over-rely on", pattern: "over-rely on standardized tests", zh: "过度依赖标准化考试", tone: "这条搭配适合在 IELTS 教育题里批评政策口头上谈改革，实际却仍把录取和评价过分压在统一考试上。", stance: "Negative" }
  ],

  "Education::adjective::fair continuous assessment": [
    { term: "balanced", pattern: "balanced continuous assessment", zh: "平衡的持续性评估", tone: "这条搭配适合在 IELTS 教育题里强调平时作业、课堂表现和项目任务被合理搭配，不让任何单一环节决定学生命运。", stance: "Positive" },
    { term: "school-based", pattern: "school-based continuous assessment", zh: "校本持续性评估", tone: "这条搭配适合在社会教育语境里客观说明评估主要由学校和任课教师在日常教学过程中完成。", stance: "Neutral" },
    { term: "inconsistent", pattern: "inconsistent continuous assessment", zh: "标准不一致的持续性评估", tone: "这条搭配适合在 IELTS 讨论中批评不同教师或学校尺度不一，导致持续性评估看似全面却未必真正公平。", stance: "Negative" }
  ],

  "Education::verb::implement continuous assessment": [
    { term: "introduce portfolio-based", pattern: "introduce portfolio-based continuous assessment", zh: "引入基于作品档案的持续性评估", tone: "这条搭配适合在 IELTS 教育题里强调学生通过项目、写作和长期成果展示真实能力，而不是只靠一次考试定胜负。", stance: "Positive" },
    { term: "conduct", pattern: "conduct continuous assessment", zh: "开展持续性评估", tone: "这条搭配适合在学校制度或课堂管理语境里中性描述教师或学校在课程期间开展持续评估、记录表现并反馈学习进展。", stance: "Neutral" },
    { term: "turn", pattern: "turn continuous assessment into constant testing", zh: "把持续性评估变成没完没了的测试", tone: "这条搭配适合在 IELTS 论证中批评执行不当时，持续性评估并没有减压，反而让学生一直处在被测和被比较的状态。", stance: "Negative" }
  ],

  "Education::adjective::rigid exam oriented education": [
    { term: "structured", pattern: "structured exam-oriented instruction", zh: "结构化的应试导向教学", tone: "这条搭配适合在 IELTS 教育题里有限度地肯定，应试导向教学如果结构清晰且不支配全部学习，可以帮助学生高效准备关键考试。", stance: "Positive" },
    { term: "results-driven", pattern: "results-driven schooling", zh: "结果导向型学校教育", tone: "这条搭配适合在社会教育语境里中性描述学校把分数、升学率和可量化结果放在较核心的位置。", stance: "Neutral" },
    { term: "test-dominated", pattern: "test-dominated schooling", zh: "被考试支配的学校教育", tone: "这条搭配适合在 IELTS 讨论中批评课堂目标被考试彻底绑架，创造力、合作能力和独立思考都被挤到边缘。", stance: "Negative" }
  ],

  "Education::verb::move beyond exam oriented education": [
    { term: "broaden", pattern: "broaden learning beyond exams", zh: "把学习拓展到考试之外", tone: "这条搭配适合在 IELTS 教育题里强调教育目标应延伸到沟通能力、创新能力和真实问题解决，而不只围着分数打转。", stance: "Positive" },
    { term: "retain", pattern: "retain some exam preparation", zh: "保留一定程度的考试准备", tone: "这条搭配适合在社会教育语境里中性表达改革并不意味着完全放弃备考，而是在更宽的学习目标中给考试训练留出适度位置。", stance: "Neutral" },
    { term: "remain", pattern: "remain trapped in exam-oriented education", zh: "继续困在应试教育里", tone: "这条搭配适合在 IELTS 论证中批评改革口号很多，但学校、家长和选拔制度最终还是把学生拉回应试轨道。", stance: "Negative" }
  ],

  "Education::adjective::well funded public school": [
    { term: "well-resourced", pattern: "well-resourced public school", zh: "资源充足的公立学校", tone: "这条搭配适合强调公立学校拥有足够的师资、设施和课程支持。", stance: "Positive" },
    { term: "state-funded", pattern: "state-funded public school", zh: "由政府资助的公立学校", tone: "这条搭配适合客观说明学校的经费来源和办学属性。", stance: "Neutral" },
    { term: "underfunded", pattern: "underfunded public school", zh: "资金不足的公立学校", tone: "这条搭配适合批评经费不足影响公立学校的教学质量和学生机会。", stance: "Negative" }
  ],

  "Education::verb::attend public school": [
    { term: "benefit from", pattern: "benefit from public schooling", zh: "受益于公立教育", tone: "这条搭配适合强调学生从公立教育中获得机会、支持或社会流动性。", stance: "Positive" },
    { term: "enrol in", pattern: "enrol in a local public school", zh: "入读本地公立学校", tone: "这条搭配适合中性描述学生进入本地公立学校就读。", stance: "Neutral" },
    { term: "be assigned to", pattern: "be assigned to an underfunded public school", zh: "被分配到资金不足的公立学校", tone: "这条搭配适合批评学生因居住地或制度安排而进入资源不足的学校。", stance: "Negative" }
  ],

  "Education::adjective::prestigious private school": [
    { term: "well-resourced", pattern: "well-resourced private school", zh: "资源充足的私立学校", tone: "这条搭配适合强调私立学校在师资、设施和升学支持上的优势。", stance: "Positive" },
    { term: "fee-paying", pattern: "fee-paying private school", zh: "收费的私立学校", tone: "这条搭配适合客观说明私立学校依靠学费运作这一属性。", stance: "Neutral" },
    { term: "elitist", pattern: "elitist private school", zh: "精英主义的私立学校", tone: "这条搭配适合批评私立学校加剧阶层隔离或教育不平等。", stance: "Negative" }
  ],

  "Education::verb::enrol in an independent school": [
    { term: "gain admission to", pattern: "gain admission to an independent school", zh: "获得私立学校录取", tone: "这条搭配适合强调学生成功获得私立学校的入学机会。", stance: "Positive" },
    { term: "apply to", pattern: "apply to an independent school", zh: "申请私立学校", tone: "这条搭配适合中性描述申请私立学校这一行为。", stance: "Neutral" },
    { term: "be priced out of", pattern: "be priced out of attending an independent school", zh: "因费用过高而无法入读私立学校", tone: "这条搭配适合批评高昂学费让学生无法入读私立学校。", stance: "Negative" }
  ],

  "Education::adjective::elite boarding school": [
    { term: "prestigious", pattern: "prestigious boarding school", zh: "有声望的寄宿学校", tone: "这条搭配适合强调寄宿学校的声誉、传统和升学资源。", stance: "Positive" },
    { term: "co-educational", pattern: "co-educational boarding school", zh: "男女同校的寄宿学校", tone: "这条搭配适合客观说明寄宿学校的招生或办学类型。", stance: "Neutral" },
    { term: "overly regimented", pattern: "overly regimented boarding school", zh: "管理过度严格的寄宿学校", tone: "这条搭配适合批评寄宿学校生活被过度管控、缺少自主空间。", stance: "Negative" }
  ],

  "Education::verb::send children to boarding school": [
    { term: "enrol children in", pattern: "enrol children in a boarding school", zh: "让孩子入读寄宿学校", tone: "这条搭配适合强调家长主动为孩子选择寄宿教育。", stance: "Positive" },
    { term: "place children in", pattern: "place children in a boarding school", zh: "安排孩子就读寄宿学校", tone: "这条搭配适合客观描述家长或监护人为孩子作出的寄宿教育安排。", stance: "Neutral" },
    { term: "send children away to", pattern: "send children away to boarding school", zh: "把孩子送离家去寄宿学校", tone: "这条搭配适合批评寄宿教育可能造成亲子分离或情感距离。", stance: "Negative" }
  ],

  "Education::adjective::universal compulsory education": [
    { term: "free", pattern: "free compulsory education", zh: "免费的义务教育", tone: "这条搭配适合强调儿童无需付费即可接受基础教育。", stance: "Positive" },
    { term: "compulsory", pattern: "compulsory schooling", zh: "法定的义务教育", tone: "这条搭配适合客观说明儿童依法必须接受基础教育。", stance: "Neutral" },
    { term: "poorly funded", pattern: "poorly funded compulsory education", zh: "经费不足的义务教育", tone: "这条搭配适合批评义务教育体系经费不足，影响学校资源和教学质量。", stance: "Negative" }
  ],

  "Education::verb::provide compulsory education": [
    { term: "guarantee access to", pattern: "guarantee access to compulsory education", zh: "保障接受义务教育的机会", tone: "这条搭配适合强调政府保障儿童受教育权。", stance: "Positive" },
    { term: "administer", pattern: "administer compulsory education", zh: "管理义务教育", tone: "这条搭配适合客观描述政府或学校执行义务教育制度。", stance: "Neutral" },
    { term: "fail to provide", pattern: "fail to provide compulsory education", zh: "未能提供义务教育", tone: "这条搭配适合批评政府或地区没有履行基础教育责任。", stance: "Negative" }
  ],

  "Education::adjective::accessible higher education": [
    { term: "affordable", pattern: "affordable higher education", zh: "负担得起的高等教育", tone: "这条搭配适合强调学生不会因费用过高而失去深造机会。", stance: "Positive" },
    { term: "publicly funded", pattern: "publicly funded higher education", zh: "公共资助的高等教育", tone: "这条搭配适合客观说明高等教育的资金来源或制度安排。", stance: "Neutral" },
    { term: "inaccessible", pattern: "inaccessible higher education", zh: "难以获得的高等教育", tone: "这条搭配适合批评学费、地域或制度门槛阻碍学生进入大学。", stance: "Negative" }
  ],

  "Education::verb::pursue higher education": [
    { term: "gain access to", pattern: "gain access to higher education", zh: "获得接受高等教育的机会", tone: "这条搭配适合强调学生获得继续深造的机会。", stance: "Positive" },
    { term: "enter", pattern: "enter higher education", zh: "进入高等教育阶段", tone: "这条搭配适合中性描述学生进入大学或高等教育体系。", stance: "Neutral" },
    { term: "be excluded from", pattern: "be excluded from higher education", zh: "被排除在高等教育之外", tone: "这条搭配适合批评经济或制度门槛阻碍学生继续深造。", stance: "Negative" }
  ],

  "Education::adjective::practical vocational education": [
    { term: "industry-linked", pattern: "industry-linked vocational education", zh: "与行业接轨的职业教育", tone: "这条搭配适合在 IELTS 教育题里强调职业教育直接对接行业标准、岗位技能和实习机会，因此更能提升学生的就业准备度。", stance: "Positive" },
    { term: "classroom-based", pattern: "classroom-based vocational education", zh: "以课堂为主的职业教育", tone: "这条搭配适合中性描述职业教育主要通过校内课程、教师讲解和基础理论训练来开展。", stance: "Neutral" },
    { term: "low-status", pattern: "low-status vocational education", zh: "社会地位较低的职业教育", tone: "这条搭配适合批评社会长期把职业教育当成次等选择，进而影响学生、家长和学校对这一路径的投入。", stance: "Negative" }
  ],

  "Education::verb::expand vocational training": [
    { term: "expand apprenticeship programmes", pattern: "expand apprenticeship programmes", zh: "扩大学徒制项目", tone: "这条搭配适合强调政府或学校通过扩大学徒制项目，把课堂学习和真实工作场景更有效地连接起来。", stance: "Positive" },
    { term: "fund vocational training", pattern: "fund vocational training", zh: "为职业培训提供资金", tone: "这条搭配适合客观讨论政府、企业或地方机构为职业培训体系提供经费支持。", stance: "Neutral" },
    { term: "cut back", pattern: "cut back on vocational training", zh: "削减职业培训", tone: "这条搭配适合批评预算收缩会压缩职业培训名额，尤其会减少非学术型学生提升技能的机会。", stance: "Negative" }
  ],

  "Education::adjective::flexible distance learning": [
    { term: "accessible", pattern: "accessible distance learning", zh: "易于获得的远程学习", tone: "这条搭配适合强调远程学习能覆盖偏远地区学生、在职人士或行动不便者，从而扩大受教育机会。", stance: "Positive" },
    { term: "asynchronous", pattern: "asynchronous distance learning", zh: "异步远程学习", tone: "这条搭配适合中性描述学习者不必同时在线、可以按自己的时间安排完成课程的远程学习模式。", stance: "Neutral" },
    { term: "poorly supervised", pattern: "poorly supervised distance learning", zh: "监督不足的远程学习", tone: "这条搭配适合批评缺少教师监督和即时反馈的远程学习，容易削弱学生的参与度和自律性。", stance: "Negative" }
  ],

  "Education::verb::offer remote education": [
    { term: "provide", pattern: "provide remote classes", zh: "提供远程课程", tone: "这条搭配适合强调学校在突发情况、地理分散或资源不足时，仍能持续向学生提供课程。", stance: "Positive" },
    { term: "deliver", pattern: "deliver remote instruction", zh: "开展远程授课", tone: "这条搭配适合客观描述教师或学校通过线上平台完成日常教学和课程交付。", stance: "Neutral" },
    { term: "replace classroom teaching with", pattern: "replace classroom teaching with remote lessons", zh: "用远程课程取代课堂教学", tone: "这条搭配适合批评学校长期用远程课程完全替代线下课堂，因为这可能削弱面对面互动和课堂管理。", stance: "Negative" }
  ],

  "Education::adjective::continuous lifelong learning": [
    { term: "ongoing", pattern: "ongoing professional learning", zh: "持续的专业学习", tone: "这条搭配适合强调成年人在工作期间持续更新知识和技能，以应对技术变化和职业转型。", stance: "Positive" },
    { term: "adult", pattern: "adult learning opportunities", zh: "成人学习机会", tone: "这条搭配适合中性描述社会为成年人提供夜校、培训课程或再教育渠道。", stance: "Neutral" },
    { term: "fragmented", pattern: "fragmented adult learning opportunities", zh: "碎片化的成人学习机会", tone: "这条搭配适合批评成人学习机会缺少系统规划，只剩零散短训或彼此脱节的课程，难以真正提升长期能力。", stance: "Negative" }
  ],

  "Education::verb::promote lifelong learning": [
    { term: "encourage adults to reskill", pattern: "encourage adults to reskill", zh: "鼓励成年人进行技能再培训", tone: "这条搭配适合强调政府或雇主帮助成年人更新技能，以适应产业变化和岗位转型。", stance: "Positive" },
    { term: "promote lifelong learning among workers", pattern: "promote lifelong learning among workers", zh: "在劳动者中推广终身学习", tone: "这条搭配适合客观描述企业或政府面向劳动者推动继续学习文化和培训参与。", stance: "Neutral" },
    { term: "pay lip service to", pattern: "pay lip service to lifelong learning", zh: "对终身学习只是口头支持", tone: "这条搭配适合批评机构嘴上强调终身学习，却没有提供时间、资金或可进入的课程支持。", stance: "Negative" }
  ],

  "Education::adjective::genuine educational equity": [
    { term: "equitable", pattern: "equitable access to education", zh: "公平获得教育的机会", tone: "这条搭配适合强调不同收入、地区和家庭背景的学生都应获得有质量的教育机会。", stance: "Positive" },
    { term: "equal access", pattern: "equal access policies", zh: "平等获得教育资源和机会的政策", tone: "这条搭配适合中性描述学校或政府制定的政策，确保学生公平获得入学机会、课程、学习支持和可负担的学习资源。", stance: "Neutral" },
    { term: "persistent", pattern: "persistent educational inequality", zh: "长期存在的教育不平等", tone: "这条搭配适合批评教育资源和机会差距长期存在，并持续限制弱势群体的社会流动。", stance: "Negative" }
  ],

  "Education::verb::ensure equality of access": [
    { term: "guarantee access for", pattern: "guarantee access to education for disadvantaged students", zh: "保障弱势学生的受教育机会", tone: "这条搭配适合强调教育制度应主动保障弱势学生获得受教育机会，包括进入优质学校、课程和支持体系。", stance: "Positive" },
    { term: "allocate places fairly", pattern: "allocate places fairly", zh: "公平分配入学名额", tone: "这条搭配适合中性描述学校或课程按照透明规则分配有限名额，重点在于名额分配过程是否公平。", stance: "Neutral" },
    { term: "deny access to", pattern: "deny access to quality education", zh: "剥夺获得优质教育的机会", tone: "这条搭配适合批评费用、地域或制度门槛让部分学生被排除在优质教育之外。", stance: "Negative" }
  ],

  "Education::adjective::well designed curriculum": [
    { term: "coherent", pattern: "coherent curriculum", zh: "连贯的课程体系", tone: "这条搭配适合强调课程目标、内容和评估彼此衔接，能帮助学生循序渐进地建立知识与能力。", stance: "Positive" },
    { term: "national", pattern: "national curriculum", zh: "国家课程", tone: "这条搭配适合中性描述由国家层面统一设定的课程框架、学习标准和核心内容。", stance: "Neutral" },
    { term: "overloaded", pattern: "overloaded curriculum", zh: "内容过载的课程体系", tone: "这条搭配适合批评课程塞入过多内容，结果压缩深度学习、创造力发展和学生休息时间。", stance: "Negative" }
  ],

  "Education::verb::revise the curriculum": [
    { term: "update curriculum content", pattern: "update curriculum content", zh: "更新课程内容", tone: "这条搭配适合强调学校及时更新课程内容，让学生接触更现代、更实用的知识与技能。", stance: "Positive" },
    { term: "align the curriculum with", pattern: "align the curriculum with labour-market needs", zh: "使课程与劳动力市场需求相匹配", tone: "这条搭配适合中性讨论课程修订时参考就业市场对技能、知识和适应力的需求。", stance: "Neutral" },
    { term: "narrow", pattern: "narrow the curriculum", zh: "压缩课程范围", tone: "这条搭配适合批评课程修订如果过度服务考试或就业，会压缩艺术、人文和公民教育的空间。", stance: "Negative" }
  ]
  ,

  "Education::adjective::effective independent learning": [
    { term: "disciplined", pattern: "disciplined independent learning", zh: "自律的自主学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里强调，自主学习之所以有效，不只是因为学生单独学习，而是因为他们能主动规划时间、管理任务并持续投入。", stance: "Positive" },
    { term: "self-paced", pattern: "self-paced independent learning", zh: "按自己节奏进行的自主学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种学习模式，重点是学习者可以按照自己的进度安排内容和节奏，而不直接评价这种安排一定更好或更差。", stance: "Neutral" },
    { term: "unsupported", pattern: "unsupported independent learning", zh: "缺乏支持的自主学习", tone: "这条搭配适合在 IELTS 或社会教育论证里指出问题：如果学校把学习责任完全丢给学生，却没有反馈、资源或指导，自主学习就容易变成低效甚至挫败的独自摸索。", stance: "Negative" }
  ],

  "Education::verb::encourage self directed learning": [
    { term: "foster", pattern: "foster learner autonomy", zh: "培养学习自主性", tone: "这条搭配适合在 IELTS 或社会教育论证里正面表达学校不只是传授知识，还应培养学生自己设定目标、寻找资源并监控学习过程的能力。", stance: "Positive" },
    { term: "guide", pattern: "guide self-directed learning", zh: "引导自主学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性说明教师的角色转变为引导者，即给方向、给框架、给反馈，而不是把每一步都替学生决定。", stance: "Neutral" },
    { term: "leave students to", pattern: "leave students to learn alone", zh: "让学生自己单打独斗地学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评一种失衡做法：表面上在鼓励自主学习，实质上却把支持撤掉，让学生在没有必要帮助的情况下独自承担全部学习压力。", stance: "Negative" }
  ],

  "Education::adjective::traditional face to face learning": [
    { term: "instruction", pattern: "traditional face-to-face instruction", zh: "传统的面授教学", tone: "这条搭配适合在 IELTS 或社会教育论证里强调面授教学的整体优势，包括教师现场讲解、即时回应、课堂互动和稳定的学习氛围。", stance: "Positive" },
    { term: "classroom-based", pattern: "classroom-based face-to-face learning", zh: "以课堂为基础的面授学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种学习安排，重点是教学活动主要在实体教室里完成，而不额外强调这种模式本身的优劣。", stance: "Neutral" },
    { term: "rigid", pattern: "rigid face-to-face learning", zh: "僵化的面授学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出传统面授的局限，比如时间安排固定、进度统一，难以照顾不同学习速度或现实通勤成本。", stance: "Negative" }
  ],

  "Education::verb::combine face to face learning with online learning": [
    { term: "combine classroom teaching with", pattern: "combine classroom teaching with online modules", zh: "将课堂教学与线上模块结合", tone: "这条搭配适合在 IELTS 或社会教育论证里说明一种较成熟的混合安排：保留线下讲解和讨论，同时利用线上模块做预习、巩固或延伸。", stance: "Positive" },
    { term: "integrate", pattern: "integrate face-to-face sessions with online learning", zh: "将面授课与线上学习整合", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述教学设计，重点在于把两种学习渠道衔接起来，而不是简单地把它们并列摆放。", stance: "Neutral" },
    { term: "force students to switch between", pattern: "force students to switch between face-to-face and online learning", zh: "迫使学生在面授与线上学习之间来回切换", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评执行不当的混合模式，因为频繁切换平台、节奏和要求，往往会增加认知负担而不是提升学习效果。", stance: "Negative" }
  ],

  "Education::adjective::interactive online learning": [
    { term: "engaging", pattern: "engaging online learning", zh: "参与度高的线上学习", tone: "这条搭配适合在 IELTS 或社会教育论证里强调，优质线上学习并不只是看视频，而是通过提问、讨论和即时反馈让学生真正参与进去。", stance: "Positive" },
    { term: "synchronous", pattern: "synchronous online learning", zh: "同步线上学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述直播网课或实时线上互动，重点是师生在同一时间在线上课、提问和交流。", stance: "Neutral" },
    { term: "poorly moderated", pattern: "poorly moderated online learning", zh: "管理不佳的线上学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出问题：如果线上课堂缺乏清晰组织和互动规则，学生很容易走神，讨论也可能流于表面。", stance: "Negative" }
  ],

  "Education::verb::adopt e learning": [
    { term: "adopt an", pattern: "adopt an e-learning platform", zh: "采用线上学习平台", tone: "这条搭配适合在 IELTS 或社会教育论证里具体说明学校如何推进线上学习，即利用平台发布课程、共享资源、布置任务并提供反馈。", stance: "Positive" },
    { term: "roll out", pattern: "roll out e-learning", zh: "推行线上学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述学校或教育部门开始实施线上学习安排，重点是制度层面的推出与覆盖。", stance: "Neutral" },
    { term: "rely on", pattern: "rely on poorly designed e-learning", zh: "依赖设计不佳的线上学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评一种常见失误：技术上了线，但课程结构、互动机制和学习支持都没有跟上，结果反而削弱教学质量。", stance: "Negative" }
  ],

  "Education::adjective::flexible blended learning": [
    { term: "model", pattern: "flexible blended-learning model", zh: "灵活的混合学习模式", tone: "这条搭配适合在 IELTS 或社会教育论证里强调混合学习的优势，即学校可以根据课程性质和学生需求，灵活安排线上与线下的比例。", stance: "Positive" },
    { term: "modular", pattern: "modular blended learning", zh: "模块化的混合学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种结构安排，意思是不同内容被分成若干模块，有些在线完成，有些在线下完成。", stance: "Neutral" },
    { term: "poorly structured", pattern: "poorly structured blended learning", zh: "结构混乱的混合学习", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出，如果课程边界、平台角色和任务要求不清楚，混合学习就可能让学生更混乱而不是更灵活。", stance: "Negative" }
  ],

  "Education::verb::introduce blended learning": [
    { term: "introduce a", pattern: "introduce a blended-learning model", zh: "引入混合学习模式", tone: "这条搭配适合在 IELTS 或社会教育论证里说明学校有计划地改革教学形式，把线下课堂和线上资源组合成一个更完整的学习体系。", stance: "Positive" },
    { term: "pilot", pattern: "pilot blended learning", zh: "试点混合学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种谨慎推进方式，先在部分年级或课程中试行，再根据结果决定是否扩大。", stance: "Neutral" },
    { term: "impose", pattern: "impose a poorly planned blended-learning model", zh: "强推规划不充分的混合学习模式", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评仓促实施和规划不足，因为课程设计、平台衔接和教师准备不到位时，混合学习往往会制造更多执行问题。", stance: "Negative" }
  ],

  "Education::adjective::productive group work": [
    { term: "well-structured", pattern: "well-structured group work", zh: "组织良好的小组学习", tone: "这条搭配适合在 IELTS 或社会教育论证里强调，小组学习之所以高效，是因为任务分工、目标和汇报方式都设计得清楚，而不是简单把学生放在一起。", stance: "Positive" },
    { term: "task-based", pattern: "task-based group work", zh: "任务型小组学习", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种课堂安排，重点是学生围绕共同任务合作完成学习活动。", stance: "Neutral" },
    { term: "free-riding in", pattern: "free-riding in group work", zh: "小组学习中的搭便车现象", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出 group work 的典型问题：有些成员贡献很少，却仍然分享同样结果，进而削弱合作的公平性和积极性。", stance: "Negative" }
  ],

  "Education::verb::facilitate collaborative learning": [
    { term: "facilitate", pattern: "facilitate peer interaction", zh: "促进同伴互动", tone: "这条搭配适合在 IELTS 或社会教育论证里强调，协作学习的关键不只是分组，而是设计能让学生彼此解释、质疑和回应的互动过程。", stance: "Positive" },
    { term: "assign", pattern: "assign collaborative projects", zh: "布置合作项目", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述教师组织协作学习的一种做法，即通过项目任务把合作嵌入课程要求之中。", stance: "Neutral" },
    { term: "force students into", pattern: "force students into poorly managed groups", zh: "把学生硬塞进管理不善的小组", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评形式化合作，因为如果分组机制和监督都不到位，学生往往会对协作学习产生反感。", stance: "Negative" }
  ],

  "Education::adjective::student centred inquiry based teaching": [
    { term: "guided", pattern: "guided inquiry-based teaching", zh: "引导式探究教学", tone: "这条搭配适合在 IELTS 或社会教育论证里强调，探究式教学并不是放任学生自己摸索，而是在教师搭建框架的前提下培养提问与思考能力。", stance: "Positive" },
    { term: "student-led", pattern: "student-led inquiry-based teaching", zh: "学生主导的探究式教学", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种课堂取向，重点是学生在问题提出、资料搜集和观点形成中承担更多主动性。", stance: "Neutral" },
    { term: "unfocused", pattern: "unfocused inquiry-based teaching", zh: "缺乏聚焦的探究式教学", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出，如果探究活动没有清晰问题链和学习目标，课堂很容易变成热闹却低效的发散讨论。", stance: "Negative" }
  ],

  "Education::verb::apply heuristic teaching": [
    { term: "use", pattern: "use Socratic questioning", zh: "运用苏格拉底式提问", tone: "这条搭配适合在 IELTS 或社会教育论证里正面表达启发式教学的做法，即教师通过层层追问帮助学生自己推理，而不是直接给标准答案。", stance: "Positive" },
    { term: "guide students through", pattern: "guide students through inquiry", zh: "引导学生展开探究", tone: "这条搭配适合在 IELTS 或社会教育语境里中性说明教师如何应用启发式教学，重点是设置路径、提供支架并陪着学生推进思考。", stance: "Neutral" },
    { term: "turn inquiry into", pattern: "turn inquiry into vague discussion", zh: "把探究变成空泛讨论", tone: "这条搭配适合在 IELTS 或社会教育讨论里批评启发式教学被误用，因为如果没有问题设计和逻辑推进，所谓探究往往只剩下没有结论的闲谈。", stance: "Negative" }
  ],

  "Education::adjective::highly personalized teaching": [
    { term: "differentiated", pattern: "differentiated instruction", zh: "差异化教学", tone: "这条搭配适合在 IELTS 或社会教育论证里强调个性化教学的成熟做法，即根据不同学生的起点、节奏和难点调整任务与支持。", stance: "Positive" },
    { term: "individualized", pattern: "individualized teaching plans", zh: "个别化教学方案", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述一种教学安排，重点是教师依据学生情况制定更具体的学习路径与目标。", stance: "Neutral" },
    { term: "excessively personalized", pattern: "excessively personalized teaching", zh: "过度个性化的教学", tone: "这条搭配适合在 IELTS 或社会教育讨论里指出风险：如果教学被过度个性化，学生可能反而失去共同标准、共同任务和必要的挑战。", stance: "Negative" }
  ],

  "Education::verb::provide tailored teaching": [
    { term: "provide", pattern: "provide targeted feedback", zh: "提供有针对性的反馈", tone: "这条搭配适合在 IELTS 或社会教育论证里具体说明个性化教学不是一句口号，而是根据学生的真实问题给出精准反馈和改进方向。", stance: "Positive" },
    { term: "adapt lessons to", pattern: "adapt lessons to learner needs", zh: "根据学习者需求调整课程", tone: "这条搭配适合在 IELTS 或社会教育语境里中性描述教师提供个性化教学的一种方式，即围绕不同学习者的基础与需求微调内容和节奏。", stance: "Neutral" },
    { term: "over-tailor instruction", pattern: "over-tailor instruction to fixed ability groups", zh: "按固定能力分组过度定制教学", tone: "这条搭配适合在 IELTS 或社会教育讨论里提醒 tailored teaching 的风险：如果教学把学生锁定在狭窄的能力类别中，反而可能限制他们继续成长。", stance: "Negative" }
  ],

  "Education::adjective::practical hands on learning": [
    { term: "project-based", pattern: "project-based hands-on learning", zh: "基于项目的实践学习", tone: "这条搭配适合在 IELTS 教育题中强调学生通过真实项目动手解决问题，而不是只停留在听讲或背概念。", stance: "Positive" },
    { term: "supervised", pattern: "supervised hands-on learning", zh: "有教师指导的实践学习", tone: "这条搭配适合中性描述学生在教师或导师监督下完成实验、操作或实践任务。", stance: "Neutral" },
    { term: "tokenistic", pattern: "tokenistic hands-on learning", zh: "流于形式的实践学习", tone: "这条搭配适合批评学校表面安排实践活动，实际任务过浅，学生并没有真正发展操作能力或解决问题能力。", stance: "Negative" }
  ],

  "Education::verb::emphasize experiential learning": [
    { term: "prioritize", pattern: "prioritize learning by doing", zh: "优先强调做中学", tone: "这条搭配适合在 IELTS 教育题中肯定学校把真实操作、项目和体验放在重要位置，帮助学生把知识转化为能力。", stance: "Positive" },
    { term: "include", pattern: "include fieldwork in the curriculum", zh: "把实地实践纳入课程", tone: "这条搭配适合中性描述课程设计中加入实地考察、社区项目或实践环节。", stance: "Neutral" },
    { term: "reduce", pattern: "reduce experiential learning to a slogan", zh: "把体验式学习降格为空洞口号", tone: "这条搭配适合批评学校口头强调体验式学习，却没有提供真实场景、任务设计和有效反馈。", stance: "Negative" }
  ],

  "Education::adjective::mechanical rote memorization": [
    { term: "deliberate", pattern: "deliberate memorization of key facts", zh: "有意识地记忆关键事实", tone: "这条搭配适合在 IELTS 教育题中有限度地肯定记忆基础事实的价值，尤其是在语言、公式或基础知识学习中。", stance: "Positive" },
    { term: "routine", pattern: "routine memorization practice", zh: "常规记忆练习", tone: "这条搭配适合中性描述学生为了掌握基础内容而进行的日常记忆训练。", stance: "Neutral" },
    { term: "mindless", pattern: "mindless rote memorization", zh: "不动脑的死记硬背", tone: "这条搭配适合批评学生只机械重复材料，却没有理解概念、联系语境或形成独立思考。", stance: "Negative" }
  ],

  "Education::verb::discourage rote memorization": [
    { term: "promote", pattern: "promote understanding over rote memorization", zh: "重理解而不是死记硬背", tone: "这条搭配适合在 IELTS 教育题中强调教师应帮助学生理解原理和联系，而不是只要求他们机械背诵。", stance: "Positive" },
    { term: "balance", pattern: "balance memorization with understanding", zh: "在记忆和理解之间取得平衡", tone: "这条搭配适合中性讨论基础记忆仍有必要，但应与概念理解、应用和分析能力结合。", stance: "Neutral" },
    { term: "replace", pattern: "replace rote memorization with shallow guessing", zh: "用浅层猜测取代死记硬背", tone: "这条搭配适合批评改革走偏：学校反对死记硬背，却没有建立深度理解，反而让学生依赖猜题和套路。", stance: "Negative" }
  ],

  "Education::adjective::consistent high achiever": [
    { term: "high-performing", pattern: "high-performing student", zh: "表现优异的学生", tone: "这条搭配适合在 IELTS 教育题中正面描述长期保持较好学习表现、能稳定完成高要求任务的学生。", stance: "Positive" },
    { term: "academically successful", pattern: "academically successful student", zh: "学业成功的学生", tone: "这条搭配适合中性描述学生在成绩、考试或课程表现上达到较高水平，而不额外评价其压力或全面发展。", stance: "Neutral" },
    { term: "pressure-cooker", pattern: "high achievers in a pressure-cooker environment", zh: "高压环境下的高成就学生", tone: "这条搭配适合批评一些表现优秀的学生虽然成绩突出，却是在激烈竞争、持续排名和高期待塑造的高压环境中成长起来的。", stance: "Negative" }
  ],

  "Education::verb::support underachievers": [
    { term: "provide", pattern: "provide remedial support for underachievers", zh: "为低成就学生提供补救性支持", tone: "这条搭配适合在 IELTS 教育题中强调学校通过补课、反馈和个别指导帮助低成就学生跟上学习进度。", stance: "Positive" },
    { term: "identify", pattern: "identify underachieving students", zh: "识别低成就学生", tone: "这条搭配适合中性描述学校通过成绩、课堂表现或学习诊断发现需要额外帮助的学生。", stance: "Neutral" },
    { term: "write off", pattern: "write off underachievers", zh: "放弃低成就学生", tone: "这条搭配适合批评学校或教师过早认定低成就学生没有潜力，从而减少支持并加深教育不平等。", stance: "Negative" }
  ],

  "Education::adjective::well rounded individuals": [
    { term: "well-rounded", pattern: "well-rounded graduates", zh: "全面发展的毕业生", tone: "这条搭配适合在 IELTS 教育题中强调学校培养的不应只是会考试的人，还应具备沟通、合作、审美和社会责任等能力。", stance: "Positive" },
    { term: "balanced", pattern: "balanced personal development", zh: "均衡的个人发展", tone: "这条搭配适合中性描述学生在学业、兴趣、品格和社交能力之间保持相对均衡的发展。", stance: "Neutral" },
    { term: "one-dimensional", pattern: "one-dimensional academic achievers", zh: "单一维度的学业成功者", tone: "这条搭配适合批评学校只追求分数和升学率，导致学生成绩好却缺少创造力、同理心或现实问题解决能力。", stance: "Negative" }
  ],

  "Education::verb::develop well rounded individuals": [
    { term: "nurture", pattern: "nurture well-rounded graduates", zh: "培养全面发展的毕业生", tone: "这条搭配适合在 IELTS 教育题中强调学校应培养学业、品格、沟通和社会参与都较均衡的学生。", stance: "Positive" },
    { term: "promote", pattern: "promote balanced personal development", zh: "促进均衡的个人发展", tone: "这条搭配适合中性讨论教育目标不只包括成绩，也包括兴趣、品格、社交能力和身心健康。", stance: "Neutral" },
    { term: "produce", pattern: "produce one-dimensional academic achievers", zh: "培养出单一维度的学业成功者", tone: "这条搭配适合批评学校如果只追求分数，可能培养出成绩好但缺少创造力、同理心和现实能力的学生。", stance: "Negative" }
  ],

  "Education::adjective::strong sense of social responsibility": [
    { term: "civic-minded", pattern: "civic-minded students", zh: "有公民意识的学生", tone: "这条搭配适合在 IELTS 教育题中强调学生愿意关心公共事务、尊重规则并参与社区生活。", stance: "Positive" },
    { term: "community-oriented", pattern: "community-oriented values", zh: "面向社区的价值观", tone: "这条搭配适合中性描述学校课程或活动鼓励学生关注社区需要和公共利益。", stance: "Neutral" },
    { term: "performative", pattern: "performative social responsibility", zh: "表演式的社会责任", tone: "这条搭配适合批评学校或学生只把社会责任当成简历包装或口号，而没有真实行动。", stance: "Negative" }
  ],

  "Education::verb::cultivate a sense of social responsibility": [
    { term: "encourage", pattern: "encourage community service", zh: "鼓励社区服务", tone: "这条搭配适合在 IELTS 教育题中说明学校通过志愿活动和社区项目培养学生的责任感。", stance: "Positive" },
    { term: "include", pattern: "include civic education in the curriculum", zh: "把公民教育纳入课程", tone: "这条搭配适合中性描述学校通过课程安排系统介绍公共责任、权利义务和社会参与。", stance: "Neutral" },
    { term: "reduce", pattern: "reduce moral education to empty slogans", zh: "把德育降格为空洞口号", tone: "这条搭配适合批评学校口头强调责任感，却缺少真实实践、讨论和行为反馈。", stance: "Negative" }
  ],

  "Education::adjective::critical independent thinking": [
    { term: "critical", pattern: "critical thinking skills", zh: "批判性思维能力", tone: "这条搭配适合在 IELTS 教育题中强调学生需要分析证据、质疑假设并形成有根据的判断。", stance: "Positive" },
    { term: "independent", pattern: "independent judgement", zh: "独立判断", tone: "这条搭配适合中性描述学生不完全依赖老师或标准答案，而能根据理由作出自己的判断。", stance: "Neutral" },
    { term: "isolated", pattern: "isolated individualism", zh: "孤立的个人主义", tone: "这条搭配适合批评所谓独立思考被误解为只顾个人立场、拒绝合作和公共责任。", stance: "Negative" }
  ],

  "Education::verb::foster independent thinking": [
    { term: "encourage", pattern: "encourage students to question assumptions", zh: "鼓励学生质疑假设", tone: "这条搭配适合在 IELTS 教育题中强调教师应引导学生追问证据和前提，而不是被动接受结论。", stance: "Positive" },
    { term: "develop", pattern: "develop independent judgement", zh: "发展独立判断能力", tone: "这条搭配适合中性描述教育逐步培养学生分析信息、比较观点并作出判断的能力。", stance: "Neutral" },
    { term: "suppress", pattern: "suppress independent thinking", zh: "压制独立思考", tone: "这条搭配适合批评过度权威的课堂或考试制度让学生不敢提出不同观点。", stance: "Negative" }
  ],

  "Education::adjective::strong cultural identity": [
    { term: "shared", pattern: "shared cultural identity", zh: "共同的文化认同", tone: "这条搭配适合在 IELTS 教育题中强调学校可以帮助学生理解共同历史、语言和价值，从而形成归属感。", stance: "Positive" },
    { term: "local", pattern: "local cultural heritage", zh: "本地文化遗产", tone: "这条搭配适合中性描述课程、博物馆活动或社区项目中涉及的地方传统与文化资源。", stance: "Neutral" },
    { term: "narrow", pattern: "narrow cultural nationalism", zh: "狭隘的文化民族主义", tone: "这条搭配适合批评文化认同教育如果排斥多元视角，可能变成封闭和排外的叙事。", stance: "Negative" }
  ],

  "Education::verb::preserve cultural identity": [
    { term: "preserve", pattern: "preserve cultural heritage", zh: "保护文化遗产", tone: "这条搭配适合在 IELTS 教育题中强调学校和社区通过语言、历史和艺术教育延续重要文化传统。", stance: "Positive" },
    { term: "transmit", pattern: "transmit cultural traditions", zh: "传承文化传统", tone: "这条搭配适合中性描述教育在代际之间传递习俗、价值观和历史记忆的功能。", stance: "Neutral" },
    { term: "freeze", pattern: "freeze culture into stereotypes", zh: "把文化固化成刻板印象", tone: "这条搭配适合批评文化教育如果只强调固定标签，可能让学生误以为文化是不变且单一的。", stance: "Negative" }
  ],

  "Education::adjective::template based essays": [
    { term: "well-structured", pattern: "well-structured essays", zh: "结构清晰的作文", tone: "这条搭配适合强调作文组织清楚、论证顺序合理，而不是依赖僵硬模板。", stance: "Positive" },
    { term: "model-based", pattern: "model-based essays", zh: "基于范文模式的作文", tone: "这条搭配适合中性描述学生参考范文框架写作，重点在写作方法本身。", stance: "Neutral" },
    { term: "formulaic", pattern: "formulaic essays", zh: "公式化作文", tone: "这条搭配适合批评作文语言和论证过度套模板，缺少真实思考。", stance: "Negative" }
  ],

  "Education::verb::write essays": [
    { term: "craft", pattern: "craft coherent essays", zh: "写出连贯的作文", tone: "这条搭配适合强调学生主动组织观点、例证和段落，语气偏积极。", stance: "Positive" },
    { term: "compose", pattern: "compose argumentative essays", zh: "撰写议论文", tone: "这条搭配适合中性描述写作任务或考试要求，不额外表达褒贬。", stance: "Neutral" },
    { term: "churn out", pattern: "churn out formulaic essays", zh: "机械地产出公式化作文", tone: "这条搭配适合批评学生为了分数机械套作，忽视观点质量。", stance: "Negative" }
  ],

  "Education::adjective::formulaic essay plans": [
    { term: "flexible", pattern: "flexible essay plans", zh: "灵活的作文计划", tone: "这条搭配适合强调提纲能随题目调整，帮助学生真正回应问题。", stance: "Positive" },
    { term: "structured", pattern: "structured essay plans", zh: "结构化的作文计划", tone: "这条搭配适合中性描述作文提纲有明确段落安排和论证顺序。", stance: "Neutral" },
    { term: "rigid", pattern: "rigid essay plans", zh: "僵硬的作文计划", tone: "这条搭配适合批评提纲过于固定，导致作文无法贴合具体题目。", stance: "Negative" }
  ],

  "Education::verb::develop essay plans": [
    { term: "develop", pattern: "develop flexible essay plans", zh: "制定灵活的作文计划", tone: "这条搭配适合强调学生在动笔前主动安排论证路径，语气偏积极。", stance: "Positive" },
    { term: "draft", pattern: "draft essay plans", zh: "起草作文计划", tone: "这条搭配适合中性描述写作前列提纲这一过程。", stance: "Neutral" },
    { term: "rely on", pattern: "rely on rigid essay plans", zh: "依赖僵硬的作文计划", tone: "这条搭配适合批评学生把提纲当成固定公式，削弱思考和回应题目的能力。", stance: "Negative" }
  ],

  "Education::adjective::convincing arguments": [
    { term: "well-supported", pattern: "well-supported arguments", zh: "有充分支撑的论点", tone: "这条搭配适合强调论点有理由和例证支撑，语气偏积极。", stance: "Positive" },
    { term: "main", pattern: "main arguments", zh: "主要论点", tone: "这条搭配适合中性描述文章中的核心观点，不额外评价质量。", stance: "Neutral" },
    { term: "unsupported", pattern: "unsupported arguments", zh: "缺乏支撑的论点", tone: "这条搭配适合批评观点只有结论，没有解释、证据或例子。", stance: "Negative" }
  ],

  "Education::verb::form own arguments": [
    { term: "build", pattern: "build well-supported arguments", zh: "构建有支撑的论点", tone: "这条搭配适合强调学生独立组织理由和证据，语气偏积极。", stance: "Positive" },
    { term: "formulate", pattern: "formulate arguments", zh: "形成论点", tone: "这条搭配适合中性描述从想法到清晰论点的过程。", stance: "Neutral" },
    { term: "recycle", pattern: "recycle memorized arguments", zh: "重复套用背过的论点", tone: "这条搭配适合批评学生不根据题目独立思考，只复用预设观点。", stance: "Negative" }
  ]
};

const COLLOCATION_OVERRIDES = {
  "adjective::public school": [
    { term: "well-resourced", zh: "\u8d44\u6e90\u5145\u8db3\u7684", tone: "\u5f3a\u8c03\u5b66\u6821\u6709\u8db3\u591f\u5e08\u8d44\u3001\u8bbe\u65bd\u548c\u8bfe\u7a0b\u652f\u6301\u3002", stance: "Positive" },
    { term: "under-resourced", zh: "\u8d44\u6e90\u4e0d\u8db3\u7684", tone: "\u5e26\u6279\u5224\u610f\u5473\uff0c\u9002\u5408\u8c08\u6559\u80b2\u4e0d\u516c\u6216\u8d44\u6e90\u7f3a\u53e3\u3002", stance: "Negative" },
    { term: "selective", zh: "\u6709\u9009\u62d4\u6027\u7684", tone: "\u8bed\u6c14\u4e2d\u6027\uff0c\u7528\u6765\u63cf\u8ff0\u5165\u5b66\u95e8\u69db\u6216\u62db\u751f\u673a\u5236\u3002", stance: "Neutral" }
  ],
  "adjective::private school": [
    { term: "prestigious", zh: "有声望的", tone: "这条搭配适合强调私立学校的声誉、资源和升学吸引力。", stance: "Positive" },
    { term: "selective", zh: "有选拔性的", tone: "这条搭配适合客观描述私立学校的入学门槛或招生机制。", stance: "Neutral" },
    { term: "elitist", zh: "精英主义的", tone: "这条搭配适合批判私立学校加剧阶层隔离或教育不平等。", stance: "Negative" }
  ],
  "adjective::private independent school": [
    { term: "prestigious", zh: "有声望的", tone: "这条搭配适合强调私立学校的声誉、资源和升学吸引力。", stance: "Positive" },
    { term: "selective", zh: "有选拔性的", tone: "这条搭配适合客观描述私立学校的入学门槛或招生机制。", stance: "Neutral" },
    { term: "elitist", zh: "精英主义的", tone: "这条搭配适合批判私立学校加剧阶层隔离或教育不平等。", stance: "Negative" }
  ],
  "adjective::private": [
    { term: "prestigious", zh: "有声望的", tone: "这条搭配适合强调私立学校的声誉、资源和升学吸引力。", stance: "Positive" },
    { term: "selective", zh: "有选拔性的", tone: "这条搭配适合客观描述私立学校的入学门槛或招生机制。", stance: "Neutral" },
    { term: "elitist", zh: "精英主义的", tone: "这条搭配适合批判私立学校加剧阶层隔离或教育不平等。", stance: "Negative" }
  ],
  "adjective::boarding school": [
    { term: "prestigious", zh: "有声望的", tone: "这条搭配适合强调寄宿学校的声誉、传统和升学资源。", stance: "Positive" },
    { term: "residential", zh: "寄宿制的", tone: "这条搭配适合客观说明学生住校学习的学校类型。", stance: "Neutral" },
    { term: "isolating", zh: "使人孤立的", tone: "这条搭配适合批判寄宿学校可能削弱家庭陪伴或社交多样性。", stance: "Negative" }
  ],
  "adjective::compulsory education": [
    { term: "universal", zh: "普及的", tone: "这条搭配适合强调义务教育覆盖所有儿童。", stance: "Positive" },
    { term: "state-funded", zh: "由国家资助的", tone: "这条搭配适合客观说明义务教育的资金来源。", stance: "Neutral" },
    { term: "underfunded", zh: "资金不足的", tone: "这条搭配适合批判义务教育资源不足。", stance: "Negative" }
  ],
  "adjective::standardized testing": [
    { term: "well-designed", zh: "设计良好的", tone: "这条搭配适合强调标准化考试能较公平地衡量学习结果。", stance: "Positive" },
    { term: "nationwide", zh: "全国性的", tone: "这条搭配适合客观说明考试覆盖范围。", stance: "Neutral" },
    { term: "high-stakes", zh: "高风险的", tone: "这条搭配适合批判考试结果对学生机会影响过大。", stance: "Negative" }
  ],
  "adjective::exam-oriented education": [
    { term: "structured", zh: "结构清晰的", tone: "这条搭配适合讲应试教育在目标和训练路径上较明确。", stance: "Positive" },
    { term: "high-stakes", zh: "高风险的", tone: "这条搭配适合客观描述考试结果对升学和机会影响很大。", stance: "Neutral" },
    { term: "narrow", zh: "狭隘的", tone: "这条搭配适合批判应试教育压缩创造力和综合能力。", stance: "Negative" }
  ],
  "adjective::face-to-face learning": [
    { term: "interactive", zh: "互动性强的", tone: "这条搭配适合强调线下课堂里的即时交流。", stance: "Positive" },
    { term: "classroom-based", zh: "课堂式的", tone: "这条搭配适合客观说明学习发生在线下教室。", stance: "Neutral" },
    { term: "inflexible", zh: "不够灵活的", tone: "这条搭配适合批判线下学习在时间和地点上受限制。", stance: "Negative" }
  ],
  "adjective::group work": [
    { term: "collaborative", zh: "协作性的", tone: "这条搭配适合强调小组合作能训练沟通和团队能力。", stance: "Positive" },
    { term: "project-based", zh: "项目式的", tone: "这条搭配适合客观描述围绕任务或项目展开的小组活动。", stance: "Neutral" },
    { term: "poorly managed", zh: "管理不善的", tone: "这条搭配适合批判小组任务分工不均或效率低。", stance: "Negative" }
  ],
  "adjective::inquiry-based teaching": [
    { term: "student-centred", zh: "以学生为中心的", tone: "这条搭配适合强调学生主动提问和探索。", stance: "Positive" },
    { term: "guided", zh: "有引导的", tone: "这条搭配适合客观说明教师仍提供方向和框架。", stance: "Neutral" },
    { term: "superficial", zh: "流于表面的", tone: "这条搭配适合批判探究式教学只停留在形式上。", stance: "Negative" }
  ],
  "adjective::heuristic teaching": [
    { term: "student-centred", zh: "以学生为中心的", tone: "这条搭配适合强调学生主动提问和探索。", stance: "Positive" },
    { term: "guided", zh: "有引导的", tone: "这条搭配适合客观说明教师仍提供方向和框架。", stance: "Neutral" },
    { term: "superficial", zh: "流于表面的", tone: "这条搭配适合批判探究式教学只停留在形式上。", stance: "Negative" }
  ],
  "adjective::high achiever": [
    { term: "top-performing", zh: "表现顶尖的", tone: "这条搭配适合强调学生成绩或表现突出。", stance: "Positive" },
    { term: "academically strong", zh: "学业能力强的", tone: "这条搭配适合客观描述学生学业表现。", stance: "Neutral" },
    { term: "burnt-out", zh: "精疲力竭的", tone: "这条搭配适合批判高成就压力带来的身心消耗。", stance: "Negative" }
  ],
  "adjective::well-rounded individuals": [
    { term: "versatile", zh: "多才多能的", tone: "这条搭配适合强调个人具备多方面能力。", stance: "Positive" },
    { term: "academically strong", zh: "学业能力强的", tone: "这条搭配适合客观描述个人在学业上的优势。", stance: "Neutral" },
    { term: "one-dimensional", zh: "单一发展的", tone: "这条搭配适合批判教育只培养单一能力。", stance: "Negative" }
  ],
  "adjective::sense of social responsibility": [
    { term: "strong", zh: "强烈的", tone: "这条搭配适合强调学生愿意关心他人和公共利益。", stance: "Positive" },
    { term: "developing", zh: "正在形成的", tone: "这条搭配适合客观描述责任感仍在培养中。", stance: "Neutral" },
    { term: "weak", zh: "薄弱的", tone: "这条搭配适合批判学生缺少公共意识和责任感。", stance: "Negative" }
  ],
  "adjective::cultural identity": [
    { term: "strong", zh: "强烈的", tone: "这条搭配适合强调学生对文化来源有清晰认同。", stance: "Positive" },
    { term: "hybrid", zh: "混合型的", tone: "这条搭配适合客观描述多元文化影响下的身份认同。", stance: "Neutral" },
    { term: "fragile", zh: "脆弱的", tone: "这条搭配适合批判文化传承不足导致认同感不稳。", stance: "Negative" }
  ],
  "adjective::civic awareness": [
    { term: "strong", zh: "强烈的", tone: "这条搭配适合强调学生理解公共责任和公民参与。", stance: "Positive" },
    { term: "developing", zh: "正在形成的", tone: "这条搭配适合客观描述公民意识仍在培养中。", stance: "Neutral" },
    { term: "weak", zh: "薄弱的", tone: "这条搭配适合批判教育缺少公民意识培养。", stance: "Negative" }
  ],
  "adjective::career preparation": [
    { term: "industry-relevant", zh: "贴近行业需求的", tone: "这条搭配适合强调职业准备能连接真实就业市场。", stance: "Positive" },
    { term: "school-based", zh: "以学校为基础的", tone: "这条搭配适合客观说明职业准备发生在校内课程或活动中。", stance: "Neutral" },
    { term: "inadequate", zh: "不足的", tone: "这条搭配适合批判职业准备无法满足就业需求。", stance: "Negative" }
  ],
  "adjective::dropout": [
    { term: "preventable", zh: "可预防的", tone: "这条搭配适合讲辍学可以通过支持系统减少。", stance: "Positive" },
    { term: "school-related", zh: "与学校相关的", tone: "这条搭配适合客观分析辍学与学校环境的关系。", stance: "Neutral" },
    { term: "early", zh: "过早的", tone: "这条搭配适合强调学生过早离开教育体系的风险。", stance: "Negative" }
  ],
  "verb::public school": [
    { term: "fund", pattern: "fund {object}", zh: "\u4e3a\u2026\u2026\u63d0\u4f9b\u8d44\u91d1", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u6539\u5584\u5b66\u6821\u6761\u4ef6\u7684\u5b9e\u9645\u6295\u5165\u3002", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "\u8bc4\u4f30", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u8c08\u8d28\u91cf\u76d1\u6d4b\u6216\u653f\u7b56\u8bc4\u4f30\u3002", stance: "Neutral" },
    { term: "underfund", pattern: "underfund {object}", zh: "\u5bf9\u2026\u2026\u6295\u5165\u4e0d\u8db3", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u7528\u4e8e\u6279\u5224\u8d44\u91d1\u4e0d\u8db3\u9020\u6210\u7684\u95ee\u9898\u3002", stance: "Negative" }
  ],
  "adjective::cybercrime": [
    { term: "traceable", zh: "\u53ef\u8ffd\u8e2a\u7684", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u72af\u7f6a\u7559\u4e0b\u7ebf\u7d22\uff0c\u4fbf\u4e8e\u8c03\u67e5\u3002", stance: "Positive" },
    { term: "complicated", zh: "\u590d\u6742\u7684", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u5f3a\u8c03\u624b\u6bb5\u6216\u7ed3\u6784\u4e0d\u7b80\u5355\u3002", stance: "Neutral" },
    { term: "anonymous", zh: "\u533f\u540d\u7684", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u8ffd\u8d23\u96be\u5ea6\u548c\u98ce\u9669\u3002", stance: "Negative" }
  ],
  "verb::cybercrime": [
    { term: "prevent", pattern: "prevent {object}", zh: "\u9884\u9632", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u5728\u635f\u5bb3\u53d1\u751f\u524d\u964d\u4f4e\u98ce\u9669\u3002", stance: "Positive" },
    { term: "investigate", pattern: "investigate {object}", zh: "\u8c03\u67e5", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u6267\u6cd5\u3001\u53d6\u8bc1\u6216\u5b89\u5168\u5ba1\u67e5\u8bed\u5883\u3002", stance: "Neutral" },
    { term: "facilitate", pattern: "facilitate {object}", zh: "\u4fbf\u5229 / \u52a9\u957f", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u7528\u4e8e\u6279\u5224\u6f0f\u6d1e\u3001\u5e73\u53f0\u6216\u76d1\u7ba1\u4e0d\u8db3\u52a9\u957f\u72af\u7f6a\u3002", stance: "Negative" }
  ],
  "verb::high-tech products": [
    { term: "commercialize", pattern: "commercialize {object}", zh: "\u5546\u4e1a\u5316", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u628a\u9ad8\u79d1\u6280\u4ea7\u54c1\u4ece\u7814\u53d1\u63a8\u5411\u5e02\u573a\u3002", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "\u8bc4\u4f30", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u6d4b\u8bd5\u9ad8\u79d1\u6280\u4ea7\u54c1\u7684\u5b89\u5168\u6027\u3001\u6210\u672c\u6216\u5b9e\u7528\u6027\u3002", stance: "Neutral" },
    { term: "misuse", pattern: "misuse {object}", zh: "\u6ee5\u7528", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u9ad8\u79d1\u6280\u4ea7\u54c1\u88ab\u7528\u4e8e\u76d1\u63a7\u3001\u6b3a\u8bc8\u6216\u5176\u4ed6\u6709\u5bb3\u76ee\u7684\u3002", stance: "Negative" }
  ],
  "verb::digital divide": [
    { term: "narrow", pattern: "narrow {object}", zh: "\u7f29\u5c0f", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u901a\u8fc7\u8bbe\u5907\u3001\u7f51\u7edc\u6216\u57f9\u8bad\u51cf\u5c11\u6570\u5b57\u5dee\u8ddd\u3002", stance: "Positive" },
    { term: "measure", pattern: "measure {object}", zh: "\u8861\u91cf", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u7528\u6570\u636e\u8bc4\u4f30\u4e0d\u540c\u5730\u533a\u6216\u7fa4\u4f53\u7684\u6570\u5b57\u63a5\u5165\u5dee\u5f02\u3002", stance: "Neutral" },
    { term: "widen", pattern: "widen {object}", zh: "\u6269\u5927", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u6280\u672f\u6216\u653f\u7b56\u8ba9\u5f31\u52bf\u7fa4\u4f53\u66f4\u96be\u63a5\u5165\u6570\u5b57\u8d44\u6e90\u3002", stance: "Negative" }
  ],
  "verb::digitalization": [
    { term: "support", pattern: "support {object}", zh: "\u652f\u6301", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u7528\u8d44\u91d1\u3001\u57f9\u8bad\u6216\u57fa\u7840\u8bbe\u65bd\u63a8\u52a8\u6570\u5b57\u5316\u3002", stance: "Positive" },
    { term: "manage", pattern: "manage {object}", zh: "\u7ba1\u7406", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5728\u6548\u7387\u3001\u9690\u79c1\u548c\u516c\u5e73\u4e4b\u95f4\u5e73\u8861\u6570\u5b57\u5316\u8fdb\u7a0b\u3002", stance: "Neutral" },
    { term: "rush", pattern: "rush {object}", zh: "\u4ed3\u4fc3\u63a8\u8fdb", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u6ca1\u6709\u8db3\u591f\u4fdd\u62a4\u6216\u51c6\u5907\u7684\u6570\u5b57\u5316\u3002", stance: "Negative" }
  ],
  "verb::disruptive innovation": [
    { term: "channel", pattern: "channel {object}", zh: "\u5f15\u5bfc", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u628a\u98a0\u8986\u6027\u521b\u65b0\u5f15\u5411\u6709\u7528\u7684\u516c\u5171\u6216\u5546\u4e1a\u76ee\u6807\u3002", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "\u8bc4\u4f30", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5224\u65ad\u98a0\u8986\u6027\u521b\u65b0\u7684\u771f\u5b9e\u4ef7\u503c\u548c\u98ce\u9669\u3002", stance: "Neutral" },
    { term: "resist", pattern: "resist {object}", zh: "\u62b5\u5236", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u673a\u6784\u56e0\u6210\u672c\u3001\u5c31\u4e1a\u6216\u5b89\u5168\u62c5\u5fe7\u800c\u6297\u62d2\u65b0\u6280\u672f\u3002", stance: "Negative" }
  ],
  "verb::online privacy": [
    { term: "safeguard", pattern: "safeguard {object}", zh: "\u4fdd\u62a4", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u901a\u8fc7\u52a0\u5bc6\u3001\u6cd5\u89c4\u6216\u5e73\u53f0\u8bbe\u8ba1\u4fdd\u62a4\u7f51\u7edc\u9690\u79c1\u3002", stance: "Positive" },
    { term: "regulate", pattern: "regulate {object}", zh: "\u76d1\u7ba1", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u653f\u5e9c\u6216\u5e73\u53f0\u5bf9\u6570\u636e\u6536\u96c6\u548c\u4f7f\u7528\u8bbe\u7f6e\u89c4\u5219\u3002", stance: "Neutral" },
    { term: "compromise", pattern: "compromise {object}", zh: "\u635f\u5bb3", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u8fc7\u5ea6\u6570\u636e\u6536\u96c6\u6216\u5b89\u5168\u6f0f\u6d1e\u635f\u5bb3\u7f51\u7edc\u9690\u79c1\u3002", stance: "Negative" }
  ],
  "verb::ai-powered tutor": [
    { term: "deploy", pattern: "deploy {object}", zh: "\u90e8\u7f72", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5b66\u6821\u6216\u5e73\u53f0\u628a AI \u52a9\u6559\u6295\u5165\u5b9e\u9645\u6559\u5b66\u573a\u666f\u3002", stance: "Positive" },
    { term: "trial", pattern: "trial {object}", zh: "\u8bd5\u7528", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5728\u5c0f\u8303\u56f4\u5185\u6d4b\u8bd5 AI \u52a9\u6559\u7684\u6548\u679c\u3002", stance: "Neutral" },
    { term: "over-rely on", pattern: "over-rely on {object}", zh: "\u8fc7\u5ea6\u4f9d\u8d56", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u5b66\u751f\u6216\u5b66\u6821\u8fc7\u5ea6\u4f9d\u8d56 AI \u52a9\u6559\u800c\u524a\u5f31\u4eba\u9645\u6307\u5bfc\u3002", stance: "Negative" }
  ],
  "verb::technological progress": [
    { term: "advance", pattern: "advance {object}", zh: "\u63a8\u8fdb", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u7814\u53d1\u3001\u6295\u8d44\u6216\u6559\u80b2\u5982\u4f55\u63a8\u52a8\u6280\u672f\u8fdb\u6b65\u3002", stance: "Positive" },
    { term: "measure", pattern: "measure {object}", zh: "\u8861\u91cf", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u7528\u4e13\u5229\u3001\u751f\u4ea7\u7387\u6216\u670d\u52a1\u6548\u7387\u6765\u8bc4\u4f30\u6280\u672f\u8fdb\u6b65\u3002", stance: "Neutral" },
    { term: "hinder", pattern: "hinder {object}", zh: "\u963b\u788d", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u8d44\u91d1\u4e0d\u8db3\u3001\u76d1\u7ba1\u5931\u8861\u6216\u4eba\u624d\u77ed\u7f3a\u963b\u788d\u6280\u672f\u8fdb\u6b65\u3002", stance: "Negative" }
  ],
  "verb::a technological revolution": [
    { term: "fuel", pattern: "fuel {object}", zh: "\u63a8\u52a8", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2 AI\u3001\u6e05\u6d01\u80fd\u6e90\u6216\u82af\u7247\u6280\u672f\u5982\u4f55\u52a0\u901f\u4e00\u573a\u6280\u672f\u9769\u547d\u3002", stance: "Positive" },
    { term: "trace", pattern: "trace {object}", zh: "\u8ffd\u8e2a", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u5ba2\u89c2\u68b3\u7406\u4e00\u573a\u6280\u672f\u9769\u547d\u7684\u8d77\u70b9\u3001\u9636\u6bb5\u548c\u5f71\u54cd\u3002", stance: "Neutral" },
    { term: "overstate", pattern: "overstate {object}", zh: "\u5938\u5927", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u5a92\u4f53\u6216\u4f01\u4e1a\u628a\u666e\u901a\u5347\u7ea7\u5938\u5927\u6210\u4e00\u573a\u6280\u672f\u9769\u547d\u3002", stance: "Negative" }
  ],
  "verb::cybersecurity": [
    { term: "strengthen", pattern: "strengthen {object}", zh: "\u52a0\u5f3a", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u901a\u8fc7\u52a0\u5bc6\u3001\u57f9\u8bad\u6216\u76d1\u7ba1\u63d0\u9ad8\u7f51\u7edc\u5b89\u5168\u3002", stance: "Positive" },
    { term: "audit", pattern: "audit {object}", zh: "\u5ba1\u67e5", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u68c0\u67e5\u7cfb\u7edf\u6f0f\u6d1e\u3001\u5408\u89c4\u6027\u548c\u5b89\u5168\u9632\u62a4\u6c34\u5e73\u3002", stance: "Neutral" },
    { term: "compromise", pattern: "compromise {object}", zh: "\u635f\u5bb3", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u5f31\u5bc6\u7801\u3001\u8f6f\u4ef6\u6f0f\u6d1e\u6216\u7ba1\u7406\u758f\u5ffd\u635f\u5bb3\u7f51\u7edc\u5b89\u5168\u3002", stance: "Negative" }
  ],
  "verb::gene editing": [
    { term: "advance", pattern: "advance {object}", zh: "\u63a8\u8fdb", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u79d1\u5b66\u5bb6\u7528\u57fa\u56e0\u7f16\u8f91\u6539\u5584\u533b\u7597\u6216\u519c\u4e1a\u6210\u679c\u3002", stance: "Positive" },
    { term: "regulate", pattern: "regulate {object}", zh: "\u76d1\u7ba1", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u901a\u8fc7\u6cd5\u5f8b\u548c\u4f26\u7406\u5ba1\u67e5\u9650\u5b9a\u57fa\u56e0\u7f16\u8f91\u7684\u8fb9\u754c\u3002", stance: "Neutral" },
    { term: "abuse", pattern: "abuse {object}", zh: "\u6ee5\u7528", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u628a\u57fa\u56e0\u7f16\u8f91\u7528\u4e8e\u4f18\u751f\u3001\u5546\u4e1a\u5671\u5934\u6216\u4e0d\u5e73\u7b49\u76ee\u7684\u3002", stance: "Negative" }
  ],
  "verb::self-driving cars": [
    { term: "deploy", pattern: "deploy {object}", zh: "\u6295\u5165\u4f7f\u7528", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5728\u9053\u8def\u6216\u7269\u6d41\u573a\u666f\u4e2d\u5b9e\u9645\u90e8\u7f72\u81ea\u52a8\u9a7e\u9a76\u6c7d\u8f66\u3002", stance: "Positive" },
    { term: "trial", pattern: "trial {object}", zh: "\u8bd5\u9a8c", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5728\u6709\u9650\u8def\u6bb5\u6d4b\u8bd5\u81ea\u52a8\u9a7e\u9a76\u6c7d\u8f66\u7684\u5b89\u5168\u6027\u548c\u53ef\u9760\u6027\u3002", stance: "Neutral" },
    { term: "overtrust", pattern: "overtrust {object}", zh: "\u8fc7\u5ea6\u4fe1\u4efb", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u53f8\u673a\u6216\u4f01\u4e1a\u8fc7\u5ea6\u4fe1\u4efb\u81ea\u52a8\u9a7e\u9a76\u6c7d\u8f66\u800c\u5ffd\u89c6\u98ce\u9669\u3002", stance: "Negative" }
  ],
  "verb::drone delivery": [
    { term: "expand", pattern: "expand {object}", zh: "\u6269\u5c55", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5c06\u65e0\u4eba\u673a\u914d\u9001\u6269\u5c55\u5230\u533b\u7597\u3001\u519c\u6751\u6216\u7d27\u6025\u7269\u8d44\u573a\u666f\u3002", stance: "Positive" },
    { term: "pilot", pattern: "pilot {object}", zh: "\u8bd5\u70b9", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5728\u5c0f\u8303\u56f4\u5185\u8bd5\u70b9\u65e0\u4eba\u673a\u914d\u9001\u7684\u6210\u672c\u548c\u7a7a\u57df\u7ba1\u7406\u95ee\u9898\u3002", stance: "Neutral" },
    { term: "mismanage", pattern: "mismanage {object}", zh: "\u7ba1\u7406\u4e0d\u5f53", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u65e0\u4eba\u673a\u914d\u9001\u5728\u566a\u97f3\u3001\u5b89\u5168\u6216\u9690\u79c1\u65b9\u9762\u7ba1\u7406\u4e0d\u5f53\u3002", stance: "Negative" }
  ],
  "verb::underachievers": [
    { term: "support", pattern: "support {object}", zh: "帮助", tone: "这条搭配适合讲学校为后进生提供辅导、反馈或心理支持。", stance: "Positive" },
    { term: "identify", pattern: "identify {object}", zh: "识别", tone: "这条搭配适合客观说明如何发现需要额外帮助的学生。", stance: "Neutral" },
    { term: "underserve", pattern: "underserve {object}", zh: "未充分服务", tone: "这条搭配适合批判学校没有给后进生足够学习支持。", stance: "Negative" }
  ],
  "verb::civic awareness": [
    { term: "raise", pattern: "raise {object}", zh: "提升", tone: "这条搭配适合讲教育或公共活动如何培养公民责任感。", stance: "Positive" },
    { term: "assess", pattern: "assess {object}", zh: "评估", tone: "这条搭配适合客观衡量学生或公众的公民意识水平。", stance: "Neutral" },
    { term: "sideline", pattern: "sideline civic education", zh: "边缘化公民教育", tone: "这条搭配适合批判教育体系把公民意识培养放到次要位置。", stance: "Negative" }
  ],
  "verb::degree inflation": [
    { term: "reduce", pattern: "reduce {object}", zh: "缓解", tone: "这条搭配适合讲降低学历贬值和过度文凭化的问题。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "分析", tone: "这条搭配适合客观研究学历要求不断上升的社会现象。", stance: "Neutral" },
    { term: "ignore", pattern: "ignore {object}", zh: "无视", tone: "这条搭配适合批判社会没有回应学历贬值带来的就业压力。", stance: "Negative" }
  ],
  "verb::greenhouse gases": [
    { term: "reduce", pattern: "reduce greenhouse gas emissions", zh: "减少温室气体排放", tone: "这条搭配适合讲通过能源转型或监管降低温室气体排放。", stance: "Positive" },
    { term: "measure", pattern: "measure greenhouse gas emissions", zh: "测量温室气体排放", tone: "这条搭配适合用数据评估行业、城市或国家的排放水平。", stance: "Neutral" },
    { term: "increase", pattern: "increase greenhouse gas emissions", zh: "增加温室气体排放", tone: "这条搭配适合批判某种产业或生活方式加剧气候问题。", stance: "Negative" }
  ],
  "verb::carbon footprint": [
    { term: "reduce", pattern: "reduce a carbon footprint", zh: "降低碳足迹", tone: "这条搭配适合讲个人、企业或城市如何减少环境影响。", stance: "Positive" },
    { term: "measure", pattern: "measure a carbon footprint", zh: "测量碳足迹", tone: "这条搭配适合客观计算某种活动或产品的排放影响。", stance: "Neutral" },
    { term: "leave", pattern: "leave a large carbon footprint", zh: "留下很大的碳足迹", tone: "这条搭配适合批判高排放消费或低效生产造成较大环境负担。", stance: "Negative" }
  ],
  "verb::wind energy": [
    { term: "expand", pattern: "expand wind energy generation", zh: "扩大风能发电", tone: "这条搭配适合讲增加清洁能源供给和减少化石燃料依赖。", stance: "Positive" },
    { term: "assess", pattern: "assess wind energy potential", zh: "评估风能潜力", tone: "这条搭配适合分析某地区开发风能的可行性和成本。", stance: "Neutral" },
    { term: "underinvest in", pattern: "underinvest in wind energy", zh: "对风能投资不足", tone: "这条搭配适合批判政府或企业没有给风能足够资金支持。", stance: "Negative" }
  ],
  "verb::taxpayers": [
    { term: "protect", pattern: "protect {object}", zh: "保护", tone: "这条搭配适合讲政策如何维护纳税人的利益和公共资金使用效率。", stance: "Positive" },
    { term: "address", pattern: "address taxpayer concerns", zh: "回应纳税人关切", tone: "这条搭配适合客观说明政府处理公众对税收政策的担忧。", stance: "Neutral" },
    { term: "disregard", pattern: "disregard taxpayers' interests", zh: "无视纳税人利益", tone: "这条搭配适合批判政策没有顾及纳税人的负担和权益。", stance: "Negative" }
  ],
  "verb::legislation": [
    { term: "introduce", pattern: "introduce {object}", zh: "推出", tone: "这条搭配适合讲政府用立法回应社会问题或治理漏洞。", stance: "Positive" },
    { term: "review", pattern: "review proposed legislation", zh: "审查拟议立法", tone: "这条搭配适合评估法律草案的必要性、成本和执行边界。", stance: "Neutral" },
    { term: "weaken", pattern: "weaken {object}", zh: "削弱", tone: "这条搭配适合批判修改法律时降低监管力度或保护水平。", stance: "Negative" }
  ],
  "verb::rights and obligations": [
    { term: "balance", pattern: "balance {object}", zh: "平衡", tone: "这条搭配适合讲在法律或社会生活中公平处理权利与义务。", stance: "Positive" },
    { term: "review", pattern: "review {object}", zh: "审视", tone: "这条搭配适合客观分析个人、企业或政府之间的责任关系。", stance: "Neutral" },
    { term: "disregard", pattern: "disregard {object}", zh: "无视", tone: "这条搭配适合批判某些行为忽略基本责任和权利边界。", stance: "Negative" }
  ],
  "verb::extradition": [
    { term: "request", pattern: "request {object}", zh: "请求", tone: "这条搭配适合讲依法推进跨境司法合作。", stance: "Positive" },
    { term: "review", pattern: "review an extradition request", zh: "审查引渡请求", tone: "这条搭配适合判断具体引渡请求是否合法、合规。", stance: "Neutral" },
    { term: "block", pattern: "block {object}", zh: "阻止", tone: "这条搭配适合批判政治阻力或程序拖延妨碍司法合作。", stance: "Negative" }
  ],
  "verb::a low birth rate": [
    { term: "reverse", pattern: "reverse {object}", zh: "扭转", tone: "这条搭配适合讲通过家庭支持、育儿补贴或住房政策改善低出生率。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "分析", tone: "这条搭配适合把低出生率作为人口趋势来客观研究。", stance: "Neutral" },
    { term: "ignore", pattern: "ignore {object}", zh: "忽视", tone: "这条搭配适合批判政府或社会没有正视低出生率的长期压力。", stance: "Negative" }
  ],
  "verb::the minimum wage": [
    { term: "raise", pattern: "raise {object}", zh: "提高", tone: "这条搭配适合讲改善低收入劳动者的收入保障。", stance: "Positive" },
    { term: "review", pattern: "review {object}", zh: "审查", tone: "这条搭配适合根据物价、就业和企业成本重新评估最低工资。", stance: "Neutral" },
    { term: "freeze", pattern: "freeze {object}", zh: "冻结", tone: "这条搭配适合批判最低工资长期不变会削弱购买力。", stance: "Negative" }
  ],
  "verb::an inclusive society": [
    { term: "build", pattern: "build {object}", zh: "建设", tone: "这条搭配适合讲让不同群体都能公平参与社会生活。", stance: "Positive" },
    { term: "discuss", pattern: "discuss social inclusion", zh: "讨论社会包容", tone: "这条搭配适合客观分析包容政策和社会参与。", stance: "Neutral" },
    { term: "undermine", pattern: "undermine social inclusion", zh: "削弱社会包容", tone: "这条搭配适合批判某些做法使弱势群体更难融入社会。", stance: "Negative" }
  ],
  "verb::public protests": [
    { term: "organize", pattern: "organize peaceful public protests", zh: "组织和平公共抗议", tone: "这条搭配适合讲以合法和平方式表达公共诉求。", stance: "Positive" },
    { term: "analyse", pattern: "analyse public protests", zh: "分析公共抗议", tone: "这条搭配适合研究抗议的原因、规模和社会影响。", stance: "Neutral" },
    { term: "suppress", pattern: "suppress public protests", zh: "压制公共抗议", tone: "这条搭配适合批判限制公众表达诉求的空间。", stance: "Negative" }
  ],
  "verb::diabetes": [
    { term: "manage", pattern: "manage {object}", zh: "管理", tone: "这条搭配适合讲通过饮食、用药和监测控制糖尿病。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "这条搭配适合持续观察血糖和病情变化。", stance: "Neutral" },
    { term: "leave untreated", pattern: "leave diabetes untreated", zh: "不治疗", tone: "这条搭配适合批判让糖尿病得不到治疗会增加并发症风险。", stance: "Negative" }
  ],
  "verb::a sedentary lifestyle": [
    { term: "avoid", pattern: "avoid {object}", zh: "避免", tone: "这条搭配适合讲通过更多活动降低久坐带来的健康风险。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "分析", tone: "这条搭配适合研究久坐习惯的成因和影响。", stance: "Neutral" },
    { term: "ignore", pattern: "ignore the risks of a sedentary lifestyle", zh: "忽视久坐风险", tone: "这条搭配适合批判不重视久坐对健康的长期危害。", stance: "Negative" }
  ],
  "verb::health promotion": [
    { term: "support", pattern: "support {object}", zh: "支持", tone: "这条搭配适合讲为公共健康宣传和预防项目提供资源。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate health promotion programmes", zh: "评估健康促进项目", tone: "这条搭配适合判断健康促进项目的覆盖率和效果。", stance: "Neutral" },
    { term: "underfund", pattern: "underfund {object}", zh: "资金不足", tone: "这条搭配适合批判资金不足削弱预防和健康教育效果。", stance: "Negative" }
  ],
  "verb::rush hour": [
    { term: "avoid", pattern: "avoid {object}", zh: "避开", tone: "这条搭配适合讲通过错峰出行减少通勤压力。", stance: "Positive" },
    { term: "analyse", pattern: "analyse rush-hour traffic", zh: "分析高峰交通", tone: "这条搭配适合研究高峰时段的车流和拥堵规律。", stance: "Neutral" },
    { term: "ignore", pattern: "ignore rush-hour congestion", zh: "忽视高峰拥堵", tone: "这条搭配适合批判交通规划没有回应高峰拥堵问题。", stance: "Negative" }
  ],
  "verb::cities bike-friendly": [
    { term: "make", pattern: "make cities bike-friendly", zh: "让城市适合骑行", tone: "这条搭配适合讲通过道路设计和骑行设施改善城市出行。", stance: "Positive" },
    { term: "assess", pattern: "assess bike-friendly infrastructure", zh: "评估骑行友好型基础设施", tone: "这条搭配适合检查自行车道、停车点和道路安全。", stance: "Neutral" },
    { term: "underprovide", pattern: "underprovide bike-friendly infrastructure", zh: "骑行基础设施供给不足", tone: "这条搭配适合批判城市建设没有给骑行者足够安全和便利。", stance: "Negative" }
  ],
  "verb::mass media": [
    { term: "regulate", pattern: "regulate {object}", zh: "监管", tone: "这条搭配适合讲通过规则让大众媒体更负责任。", stance: "Positive" },
    { term: "analyse", pattern: "analyse the influence of mass media", zh: "分析大众媒体的影响", tone: "这条搭配适合客观分析大众媒体对公众观点和社会议题的影响。", stance: "Neutral" },
    { term: "misuse", pattern: "misuse {object}", zh: "滥用", tone: "这条搭配适合批判不当使用大众媒体造成误导、操控或煽动。", stance: "Negative" }
  ],
  "verb::a brand image": [
    { term: "build", pattern: "build {object}", zh: "建立", tone: "这条搭配适合讲企业如何塑造积极的公众印象。", stance: "Positive" },
    { term: "review", pattern: "review {object}", zh: "审视", tone: "这条搭配适合客观评估品牌给消费者留下的印象。", stance: "Neutral" },
    { term: "damage", pattern: "damage {object}", zh: "损害", tone: "这条搭配适合批判不当营销、丑闻或低质量服务让品牌声誉变差。", stance: "Negative" }
  ],
  "verb::consumerism": [
    { term: "discourage", pattern: "discourage excessive consumerism", zh: "抑制过度消费主义", tone: "这条搭配适合讲减少盲目消费和攀比消费。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "分析", tone: "这条搭配适合客观讨论消费文化、广告和身份认同之间的关系。", stance: "Neutral" },
    { term: "encourage", pattern: "encourage {object}", zh: "鼓励", tone: "这条搭配适合批判广告或平台推动过度消费观念。", stance: "Negative" }
  ],
  "verb::invasion of privacy": [
    { term: "prevent", pattern: "prevent {object}", zh: "防止", tone: "这条搭配适合讲保护个人信息和私人边界。", stance: "Positive" },
    { term: "assess", pattern: "assess privacy risks", zh: "评估隐私风险", tone: "这条搭配适合客观评估平台、媒体或技术带来的隐私问题。", stance: "Neutral" },
    { term: "violate", pattern: "violate personal privacy", zh: "侵犯个人隐私", tone: "这条搭配适合批判直接伤害个人隐私权的行为。", stance: "Negative" }
  ],
  "verb::stimulus measures": [
    { term: "introduce", pattern: "introduce {object}", zh: "推出", tone: "这条搭配适合讲政府用政策支持经济恢复或稳定就业。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析刺激措施的成本、效果和副作用。", stance: "Neutral" },
    { term: "withdraw", pattern: "withdraw stimulus measures too early", zh: "过早撤回刺激措施", tone: "这条搭配适合批判政策退出过快导致经济承压。", stance: "Negative" }
  ],
  "verb::offshore production": [
    { term: "optimize", pattern: "optimize {object}", zh: "优化", tone: "这条搭配适合讲更高效地配置海外产能和供应链。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析海外生产的成本、风险和就业影响。", stance: "Neutral" },
    { term: "over-rely on", pattern: "over-rely on {object}", zh: "过度依赖", tone: "这条搭配适合批判供应链过分外移并带来脆弱性。", stance: "Negative" }
  ],
  "verb::a free trade zone": [
    { term: "establish", pattern: "establish {object}", zh: "建立", tone: "这条搭配适合讲通过自由贸易区促进贸易便利化。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析自由贸易区的规则、成本和收益。", stance: "Neutral" },
    { term: "mismanage", pattern: "mismanage {object}", zh: "管理不善", tone: "这条搭配适合批判治理不到位削弱自由贸易区的效果。", stance: "Negative" }
  ],
  "verb::foreign direct investment": [
    { term: "attract", pattern: "attract {object}", zh: "吸引", tone: "这条搭配适合讲通过稳定政策和营商环境增强经济吸引力。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析资本流入对就业、产业和监管的影响。", stance: "Neutral" },
    { term: "discourage", pattern: "discourage {object}", zh: "抑制", tone: "这条搭配适合批判政策不稳或市场壁垒让外资却步。", stance: "Negative" }
  ],
  "verb::dance performances": [
    { term: "attend", pattern: "attend {object}", zh: "观看", tone: "这条搭配适合讲参与和支持现场艺术活动。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "赏析", tone: "这条搭配适合从动作、舞台和文化表达角度分析舞蹈表演。", stance: "Neutral" },
    { term: "dismiss", pattern: "dismiss {object}", zh: "轻视", tone: "这条搭配适合批判把舞蹈表演视为不重要或缺乏价值。", stance: "Negative" }
  ],
  "verb::abstract paintings": [
    { term: "create", pattern: "create {object}", zh: "创作", tone: "这条搭配适合讲艺术家进行抽象画创作。", stance: "Positive" },
    { term: "interpret", pattern: "interpret {object}", zh: "解读", tone: "这条搭配适合分析抽象画的形式、色彩和意义。", stance: "Neutral" },
    { term: "dismiss", pattern: "dismiss {object}", zh: "轻视", tone: "这条搭配适合批判否定抽象画的艺术价值。", stance: "Negative" }
  ],
  "verb::immersive projections": [
    { term: "use", pattern: "use {object}", zh: "使用", tone: "这条搭配适合讲借助沉浸式投影增强艺术体验。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析沉浸式投影的展示效果和成本。", stance: "Neutral" },
    { term: "overuse", pattern: "overuse {object}", zh: "过度使用", tone: "这条搭配适合批判技术喧宾夺主、削弱艺术内容。", stance: "Negative" }
  ],
  "verb::monetary incentives": [
    { term: "offer", pattern: "offer {object}", zh: "提供", tone: "这条搭配适合讲用资金鼓励创作、参赛或文化参与。", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "评估", tone: "这条搭配适合客观分析奖励机制的效果和副作用。", stance: "Neutral" },
    { term: "overemphasize", pattern: "overemphasize {object}", zh: "过度强调", tone: "这条搭配适合批判让艺术活动过分功利化。", stance: "Negative" }
  ],
  "verb::scientific research": [
    { term: "fund", pattern: "fund {object}", zh: "\u8d44\u52a9", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u653f\u5e9c\u6216\u4f01\u4e1a\u901a\u8fc7\u6295\u5165\u652f\u6301\u79d1\u5b66\u7814\u7a76\u3002", stance: "Positive" },
    { term: "evaluate", pattern: "evaluate {object}", zh: "\u8bc4\u4f30", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u8bb2\u5ba1\u67e5\u79d1\u5b66\u7814\u7a76\u7684\u65b9\u6cd5\u3001\u8bc1\u636e\u548c\u793e\u4f1a\u4ef7\u503c\u3002", stance: "Neutral" },
    { term: "restrict", pattern: "restrict {object}", zh: "\u9650\u5236", tone: "\u8fd9\u6761\u642d\u914d\u9002\u5408\u6279\u5224\u8fc7\u5ea6\u5ba1\u67e5\u6216\u8d44\u91d1\u524a\u51cf\u9650\u5236\u79d1\u5b66\u7814\u7a76\u3002", stance: "Negative" }
  ],
  "adjective::automation": [
    { term: "factory-wide", zh: "全厂范围的", tone: "适合工业和生产线语境。", stance: "Neutral" },
    { term: "AI-driven", zh: "由 AI 驱动的", tone: "强调技术来源和现代化程度。", stance: "Positive" },
    { term: "labor-saving", zh: "节省劳动力的", tone: "强调效率，也可引出就业争议。", stance: "Positive" }
  ],
  "adjective::virtual": [
    { term: "engaging", zh: "有吸引力的", tone: "强调体验感和参与度。", stance: "Positive" },
    { term: "interactive", zh: "互动式的", tone: "中性描述技术特征。", stance: "Neutral" },
    { term: "lifelike", zh: "逼真的", tone: "强调沉浸感，适合 VR/AR。", stance: "Positive" }
  ],
  "adjective::digital divide": [
    { term: "deep", zh: "严重的", tone: "强调差距很大。", stance: "Negative" },
    { term: "persistent", zh: "持续存在的", tone: "强调长期未解决。", stance: "Negative" },
    { term: "widening", zh: "扩大的", tone: "强调趋势正在变差。", stance: "Negative" }
  ],
  "verb::technological revolution": [
    { term: "trigger", pattern: "trigger {object}", zh: "引发", tone: "积极或中性，强调带来重大变化。", stance: "Positive" },
    { term: "accelerate", pattern: "accelerate {object}", zh: "加速", tone: "中性，强调变化速度。", stance: "Neutral" },
    { term: "resist", pattern: "resist {object}", zh: "抵制", tone: "消极或保守语气，强调抗拒变化。", stance: "Negative" }
  ],
  "verb::cyberbullying": [
    { term: "prevent", pattern: "prevent {object}", zh: "预防", tone: "积极语气，强调提前减少伤害。", stance: "Positive" },
    { term: "report", pattern: "report {object}", zh: "举报", tone: "中性行动，适合学校和平台治理。", stance: "Neutral" },
    { term: "enable", pattern: "enable {object}", zh: "助长", tone: "消极语气，批判平台或监管漏洞。", stance: "Negative" }
  ],
  "verb::screen time": [
    { term: "reduce", pattern: "reduce {object}", zh: "减少", tone: "积极语气，强调健康管理。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "中性语气，强调记录和观察。", stance: "Neutral" },
    { term: "increase", pattern: "increase {object}", zh: "增加", tone: "消极语气，常用于批判沉迷。", stance: "Negative" }
  ],
  "adjective::self-driving car": [
    { term: "driverless", zh: "无人驾驶的", tone: "自然替换 fully autonomous。", stance: "Neutral" },
    { term: "semi-autonomous", zh: "半自动驾驶的", tone: "中性，强调技术程度。", stance: "Neutral" },
    { term: "fully automated", pattern: "fully automated vehicle", zh: "完全自动化的", tone: "正式，适合交通科技语境。", stance: "Positive" }
  ],
  "adjective::hands-on": [
    { term: "experiential", zh: "体验式的", tone: "避免 hands-on hands-on 的重复。", stance: "Positive" },
    { term: "practice-based", zh: "以实践为基础的", tone: "强调训练方式。", stance: "Positive" },
    { term: "real-world", zh: "贴近现实的", tone: "强调可迁移到真实场景。", stance: "Positive" }
  ],
  "adjective::lifelong learning": [
    { term: "self-directed", zh: "自主导向的", tone: "强调学习者主动性。", stance: "Positive" },
    { term: "career-long", zh: "贯穿职业生涯的", tone: "适合就业和职业发展。", stance: "Neutral" },
    { term: "continuous professional", zh: "持续专业发展的", tone: "正式，适合职场教育。", stance: "Positive" }
  ],
  "adjective::curriculum": [
    { term: "balanced", zh: "均衡的", tone: "强调学术、技能和价值观兼顾。", stance: "Positive" },
    { term: "skills-based", zh: "以技能为导向的", tone: "强调实用能力。", stance: "Positive" },
    { term: "outdated", zh: "过时的", tone: "消极语气，适合批判课程滞后。", stance: "Negative" }
  ],
  "adjective::compulsory": [
    { term: "core", pattern: "core course", zh: "核心课程", tone: "自然替代 mandatory compulsory course。", stance: "Neutral" },
    { term: "optional", pattern: "optional course", zh: "选修课程", tone: "中性，强调选择性。", stance: "Neutral" },
    { term: "specialized", pattern: "specialized course", zh: "专业课程", tone: "强调细分领域。", stance: "Positive" }
  ],
  "adjective::rote memorization": [
    { term: "mindless", zh: "机械无思考的", tone: "消极，强调缺乏理解。", stance: "Negative" },
    { term: "exam-driven", zh: "考试驱动的", tone: "偏消极，适合应试教育。", stance: "Negative" },
    { term: "repetitive", zh: "重复性的", tone: "中性到消极。", stance: "Neutral" }
  ],
  "adjective::tuition fees": [
    { term: "soaring", zh: "飙升的", tone: "强调上涨速度快。", stance: "Negative" },
    { term: "unaffordable", zh: "难以负担的", tone: "消极，强调经济压力。", stance: "Negative" },
    { term: "regulated", zh: "受监管的", tone: "中性，适合政策语境。", stance: "Neutral" }
  ],
  "verb::unequal distribution of educational resources": [
    { term: "reduce", pattern: "reduce {object}", zh: "减少", tone: "积极，强调改善不平等。", stance: "Positive" },
    { term: "map", pattern: "map {object}", zh: "梳理 / 绘制分布", tone: "中性，强调识别问题。", stance: "Neutral" },
    { term: "worsen", pattern: "worsen {object}", zh: "加剧", tone: "消极，强调让差距扩大。", stance: "Negative" }
  ],
  "verb::commercialization of education": [
    { term: "curb", pattern: "curb {object}", zh: "遏制", tone: "积极，强调限制负面趋势。", stance: "Positive" },
    { term: "question", pattern: "question {object}", zh: "质疑", tone: "中性到批判。", stance: "Neutral" },
    { term: "fuel", pattern: "fuel {object}", zh: "助长", tone: "消极，强调推动不良趋势。", stance: "Negative" }
  ],
  "adjective::climate change": [
    { term: "human-induced", zh: "人为导致的", tone: "强调原因。", stance: "Neutral" },
    { term: "long-term", zh: "长期的", tone: "中性，强调时间跨度。", stance: "Neutral" },
    { term: "catastrophic", zh: "灾难性的", tone: "消极，强调严重后果。", stance: "Negative" }
  ],
  "verb::climate change": [
    { term: "combat", pattern: "combat {object}", zh: "应对 / 抗击", tone: "积极，强调主动行动。", stance: "Positive" },
    { term: "address", pattern: "address {object}", zh: "处理 / 应对", tone: "中性政策语气。", stance: "Neutral" },
    { term: "worsen", pattern: "worsen {object}", zh: "加剧", tone: "消极，强调造成更坏后果。", stance: "Negative" }
  ],
  "adjective::global warming": [
    { term: "accelerated", zh: "加速的", tone: "强调速度变快。", stance: "Negative" },
    { term: "human-caused", zh: "人为造成的", tone: "中性，强调原因。", stance: "Neutral" },
    { term: "unchecked", zh: "未受控制的", tone: "消极，强调风险失控。", stance: "Negative" }
  ],
  "verb::global warming": [
    { term: "curb", pattern: "curb {object}", zh: "遏制", tone: "积极，强调控制趋势。", stance: "Positive" },
    { term: "measure", pattern: "measure {object}", zh: "衡量", tone: "中性，适合科学和政策分析。", stance: "Neutral" },
    { term: "accelerate", pattern: "accelerate {object}", zh: "加速", tone: "消极，强调让问题恶化。", stance: "Negative" }
  ],
  "adjective::greenhouse gases": [
    { term: "heat-trapping", zh: "吸热的", tone: "科学语境自然。", stance: "Neutral" },
    { term: "man-made", zh: "人为产生的", tone: "强调来源。", stance: "Neutral" },
    { term: "excess", zh: "过量的", tone: "消极，强调超出环境承受范围。", stance: "Negative" }
  ],
  "adjective::ecological footprint": [
    { term: "large", zh: "大的", tone: "自然搭配，强调影响规模。", stance: "Negative" },
    { term: "individual", zh: "个人的", tone: "中性，适合生活方式话题。", stance: "Neutral" },
    { term: "unsustainable", zh: "不可持续的", tone: "消极，强调环境压力。", stance: "Negative" }
  ],
  "adjective::recycling": [
    { term: "effective", zh: "有效的", tone: "积极，强调实际效果。", stance: "Positive" },
    { term: "household", zh: "家庭层面的", tone: "中性，强调场景。", stance: "Neutral" },
    { term: "inefficient", zh: "低效的", tone: "消极，强调执行效果差。", stance: "Negative" }
  ],
  "adjective::solar power": [
    { term: "large-scale", zh: "大规模的", tone: "适合能源项目。", stance: "Neutral" },
    { term: "intermittent", zh: "间歇性的", tone: "中性到消极，强调不稳定。", stance: "Neutral" },
    { term: "renewable", zh: "可再生的", tone: "积极，强调能源属性。", stance: "Positive" }
  ],
  "adjective::endangered species": [
    { term: "critically endangered", zh: "极度濒危的", tone: "强调风险严重。", stance: "Negative" },
    { term: "protected", zh: "受保护的", tone: "积极，强调保护状态。", stance: "Positive" },
    { term: "vulnerable", zh: "易受威胁的", tone: "消极，强调脆弱性。", stance: "Negative" }
  ],
  "adjective::taxpayers": [
    { term: "ordinary", zh: "普通的", tone: "中性，强调一般纳税人。", stance: "Neutral" },
    { term: "low-income", zh: "低收入的", tone: "中性，强调群体特征。", stance: "Neutral" },
    { term: "overburdened", zh: "负担过重的", tone: "消极，强调税负压力。", stance: "Negative" }
  ],
  "adjective::national budget": [
    { term: "annual", zh: "年度的", tone: "中性财政搭配。", stance: "Neutral" },
    { term: "balanced", zh: "平衡的", tone: "积极，强调收支可控。", stance: "Positive" },
    { term: "strained", zh: "吃紧的", tone: "消极，强调财政压力。", stance: "Negative" }
  ],
  "adjective::judicial independence": [
    { term: "genuine", zh: "真正的", tone: "积极，强调实质性独立。", stance: "Positive" },
    { term: "constitutional", zh: "宪法层面的", tone: "中性正式。", stance: "Neutral" },
    { term: "fragile", zh: "脆弱的", tone: "消极，强调易受干预。", stance: "Negative" }
  ],
  "adjective::human trafficking": [
    { term: "cross-border", zh: "跨境的", tone: "自然犯罪搭配。", stance: "Neutral" },
    { term: "organized", zh: "有组织的", tone: "强调犯罪结构。", stance: "Negative" },
    { term: "large-scale", zh: "大规模的", tone: "强调严重程度。", stance: "Negative" }
  ],
  "adjective::money laundering": [
    { term: "sophisticated", zh: "复杂的", tone: "强调手段隐蔽复杂。", stance: "Negative" },
    { term: "cross-border", zh: "跨境的", tone: "中性描述犯罪范围。", stance: "Neutral" },
    { term: "large-scale", zh: "大规模的", tone: "强调严重程度。", stance: "Negative" }
  ],
  "adjective::urbanization": [
    { term: "large-scale", zh: "大规模的", tone: "强调城市化范围。", stance: "Neutral" },
    { term: "accelerated", zh: "加速的", tone: "强调速度。", stance: "Neutral" },
    { term: "unplanned", zh: "缺乏规划的", tone: "消极，强调问题风险。", stance: "Negative" }
  ],
  "verb::urbanization": [
    { term: "guide", pattern: "guide {object}", zh: "引导", tone: "积极，强调规划方向。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "中性，强调观察趋势。", stance: "Neutral" },
    { term: "mismanage", pattern: "mismanage {object}", zh: "管理不善", tone: "消极，强调治理失败。", stance: "Negative" }
  ],
  "adjective::urban sprawl": [
    { term: "unchecked", zh: "不受控制的", tone: "消极，强调扩张失控。", stance: "Negative" },
    { term: "low-density", zh: "低密度的", tone: "中性描述城市形态。", stance: "Neutral" },
    { term: "car-dependent", zh: "依赖汽车的", tone: "消极，强调交通问题。", stance: "Negative" }
  ],
  "verb::urban sprawl": [
    { term: "contain", pattern: "contain {object}", zh: "控制", tone: "积极，强调限制无序扩张。", stance: "Positive" },
    { term: "measure", pattern: "measure {object}", zh: "衡量", tone: "中性，强调城市研究。", stance: "Neutral" },
    { term: "fuel", pattern: "fuel {object}", zh: "助长", tone: "消极，强调推动问题扩大。", stance: "Negative" }
  ],
  "adjective::urban slum": [
    { term: "deprived", zh: "贫困匮乏的", tone: "消极，强调资源不足。", stance: "Negative" },
    { term: "informal", zh: "非正式的", tone: "中性，常用于 settlements。", stance: "Neutral" },
    { term: "overcrowded", zh: "过度拥挤的", tone: "消极，强调居住压力。", stance: "Negative" }
  ],
  "verb::urban slum": [
    { term: "upgrade", pattern: "upgrade {object}", zh: "升级改造", tone: "积极，强调改善基础设施。", stance: "Positive" },
    { term: "survey", pattern: "survey {object}", zh: "调研", tone: "中性，强调了解情况。", stance: "Neutral" },
    { term: "neglect", pattern: "neglect {object}", zh: "忽视", tone: "消极，强调治理缺位。", stance: "Negative" }
  ],
  "adjective::fake news": [
    { term: "fabricated", zh: "捏造的", tone: "消极，强调内容虚假。", stance: "Negative" },
    { term: "politically motivated", zh: "有政治动机的", tone: "中性到消极，强调目的。", stance: "Negative" },
    { term: "viral", zh: "病毒式传播的", tone: "中性，强调传播速度。", stance: "Neutral" }
  ],
  "verb::fake news": [
    { term: "counter", pattern: "counter {object}", zh: "反制", tone: "积极，强调纠偏。", stance: "Positive" },
    { term: "track", pattern: "track {object}", zh: "追踪", tone: "中性，强调监测传播。", stance: "Neutral" },
    { term: "amplify", pattern: "amplify {object}", zh: "放大传播", tone: "消极，强调助长传播。", stance: "Negative" }
  ],
  "verb::misinformation": [
    { term: "curb", pattern: "curb {object}", zh: "遏制", tone: "积极，强调控制扩散。", stance: "Positive" },
    { term: "track", pattern: "track {object}", zh: "追踪", tone: "中性，强调监测。", stance: "Neutral" },
    { term: "spread", pattern: "spread {object}", zh: "传播", tone: "消极，强调扩散虚假信息。", stance: "Negative" }
  ],
  "adjective::advertising manipulation": [
    { term: "covert", zh: "隐蔽的", tone: "消极，强调不透明。", stance: "Negative" },
    { term: "data-driven", zh: "数据驱动的", tone: "中性，强调技术方式。", stance: "Neutral" },
    { term: "exploitative", zh: "剥削性的", tone: "消极，强调利用弱点。", stance: "Negative" }
  ],
  "verb::advertising manipulation": [
    { term: "expose", pattern: "expose {object}", zh: "揭露", tone: "积极，强调提高透明度。", stance: "Positive" },
    { term: "regulate", pattern: "regulate {object}", zh: "监管", tone: "中性政策语气。", stance: "Neutral" },
    { term: "normalise", pattern: "normalise {object}", zh: "使常态化", tone: "消极，强调不良做法被接受。", stance: "Negative" }
  ],
  "adjective::media bias": [
    { term: "ideological", zh: "意识形态上的", tone: "中性，强调偏见来源。", stance: "Neutral" },
    { term: "systematic", zh: "系统性的", tone: "消极，强调不是个别现象。", stance: "Negative" },
    { term: "one-sided", zh: "片面的", tone: "消极，适合批判报道失衡。", stance: "Negative" }
  ],
  "verb::media bias": [
    { term: "challenge", pattern: "challenge {object}", zh: "质疑 / 挑战", tone: "积极，强调批判性阅读。", stance: "Positive" },
    { term: "identify", pattern: "identify {object}", zh: "识别", tone: "中性，强调发现问题。", stance: "Neutral" },
    { term: "reinforce", pattern: "reinforce {object}", zh: "强化", tone: "消极，强调加深偏见。", stance: "Negative" }
  ],
  "adjective::inflation": [
    { term: "manageable", zh: "可控的", tone: "积极，强调仍在可管理范围。", stance: "Positive" },
    { term: "persistent", zh: "持续的", tone: "中性到消极，强调长期存在。", stance: "Neutral" },
    { term: "runaway", zh: "失控的", tone: "消极，强调快速恶化。", stance: "Negative" }
  ],
  "verb::inflation": [
    { term: "contain", pattern: "contain {object}", zh: "控制", tone: "积极，强调压住上涨。", stance: "Positive" },
    { term: "assess", pattern: "assess {object}", zh: "评估", tone: "中性，强调经济分析。", stance: "Neutral" },
    { term: "fuel", pattern: "fuel {object}", zh: "助推", tone: "消极，强调推高通胀。", stance: "Negative" }
  ],
  "verb::unemployment rate": [
    { term: "reduce", pattern: "reduce {object}", zh: "降低", tone: "积极，强调改善就业。", stance: "Positive" },
    { term: "discuss", pattern: "discuss {object}", zh: "讨论", tone: "中性，适合经济分析。", stance: "Neutral" },
    { term: "worsen", pattern: "worsen {object}", zh: "使恶化", tone: "消极，强调失业上升。", stance: "Negative" }
  ],
  "verb::economic crisis": [
    { term: "withstand", pattern: "withstand {object}", zh: "经受住", tone: "积极，强调韧性。", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "分析", tone: "这条搭配适合客观分析经济危机的原因、传导路径和影响。", stance: "Neutral" },
    { term: "deepen", pattern: "deepen {object}", zh: "加深", tone: "消极，强调危机恶化。", stance: "Negative" }
  ],
  "verb::trade deficit": [
    { term: "narrow", pattern: "narrow {object}", zh: "缩小", tone: "积极，强调改善贸易差额。", stance: "Positive" },
    { term: "assess", pattern: "assess {object}", zh: "评估", tone: "中性经济语气。", stance: "Neutral" },
    { term: "widen", pattern: "widen {object}", zh: "扩大", tone: "消极，强调赤字增加。", stance: "Negative" }
  ],
  "verb::currency fluctuation": [
    { term: "stabilize", pattern: "stabilize {object}", zh: "稳定", tone: "这条搭配适合讲通过政策、储备或市场信心降低货币波动。", stance: "Positive" },
    { term: "track", pattern: "track {object}", zh: "追踪", tone: "这条搭配适合客观观察汇率变化和市场反应。", stance: "Neutral" },
    { term: "trigger", pattern: "trigger {object}", zh: "引发", tone: "这条搭配适合批判政策冲击或投机行为造成货币波动。", stance: "Negative" }
  ],
  "verb::cost of living": [
    { term: "minimize", pattern: "minimize {object}", zh: "尽量降低", tone: "积极，强调减轻生活压力。", stance: "Positive" },
    { term: "assess", pattern: "assess {object}", zh: "评估", tone: "中性，适合政策分析。", stance: "Neutral" },
    { term: "push up", pattern: "push up {object}", zh: "推高", tone: "消极，强调价格压力。", stance: "Negative" }
  ],
  "adjective::performing arts": [
    { term: "vibrant", zh: "有活力的", tone: "积极，强调文化生命力。", stance: "Positive" },
    { term: "traditional", zh: "传统的", tone: "中性，强调文化来源。", stance: "Neutral" },
    { term: "commercialized", zh: "商业化的", tone: "消极，适合批判艺术商品化。", stance: "Negative" }
  ],
  "adjective::contemporary sculpture": [
    { term: "monumental", zh: "纪念碑式的 / 巨大的", tone: "适合大型雕塑。", stance: "Neutral" },
    { term: "site-specific", zh: "场地特定的", tone: "艺术专业搭配。", stance: "Neutral" },
    { term: "diverse", zh: "多样的", tone: "积极，强调形式丰富。", stance: "Positive" }
  ],
  "adjective::digital installations": [
    { term: "immersive", zh: "沉浸式的", tone: "适合数字装置艺术。", stance: "Positive" },
    { term: "site-specific", zh: "场地特定的", tone: "中性专业搭配。", stance: "Neutral" },
    { term: "technically fragile", zh: "技术上脆弱的", tone: "消极，强调维护风险。", stance: "Negative" }
  ],
  "adjective::online streaming platforms": [
    { term: "mainstream", zh: "主流的", tone: "中性，强调市场位置。", stance: "Neutral" },
    { term: "subscription-based", zh: "订阅制的", tone: "中性商业模式描述。", stance: "Neutral" },
    { term: "commercialized", zh: "商业化的", tone: "消极，适合批判过度逐利。", stance: "Negative" }
  ],
  "verb::artistic value": [
    { term: "preserve", pattern: "preserve {object}", zh: "保留 / 维护", tone: "积极，强调不让价值流失。", stance: "Positive" },
    { term: "assess", pattern: "assess {object}", zh: "评估", tone: "中性，适合评论和判断。", stance: "Neutral" },
    { term: "diminish", pattern: "diminish {object}", zh: "削弱", tone: "消极，强调价值降低。", stance: "Negative" }
  ],
  "verb::cultural heritage preservation": [
    { term: "finance", pattern: "finance {object}", zh: "资助", tone: "积极，强调资金支持。", stance: "Positive" },
    { term: "discuss", pattern: "discuss {object}", zh: "讨论", tone: "中性，适合政策辩论。", stance: "Neutral" },
    { term: "underfund", pattern: "underfund {object}", zh: "资金不足", tone: "这条搭配适合批判文化遗产保护缺少稳定资金和制度支持。", stance: "Negative" }
  ],
  "verb::social commentary": [
    { term: "deliver", pattern: "deliver {object}", zh: "表达 / 呈现", tone: "积极，适合艺术作品功能。", stance: "Positive" },
    { term: "interpret", pattern: "interpret {object}", zh: "解读", tone: "这条搭配适合分析艺术作品如何表达社会评论。", stance: "Neutral" },
    { term: "suppress", pattern: "suppress {object}", zh: "压制", tone: "消极，强调限制表达。", stance: "Negative" }
  ],
  "verb::urban slums": [
    { term: "redevelop", pattern: "redevelop {object}", zh: "重建", tone: "这条搭配适合讲通过住房、交通和公共服务改善城市贫民窟。", stance: "Positive" },
    { term: "map", pattern: "map {object}", zh: "绘制分布", tone: "这条搭配适合客观调查城市贫民窟的位置、人口和基础设施状况。", stance: "Neutral" },
    { term: "leave overcrowded", pattern: "leave urban slums overcrowded", zh: "使城市贫民窟持续过度拥挤", tone: "这条搭配适合批判城市规划失灵让贫民窟拥挤问题长期存在。", stance: "Negative" }
  ],
  "adjective::juvenile delinquency": [
    { term: "preventable", zh: "可预防的", tone: "积极，暗示可以通过早期干预减少。", stance: "Positive" },
    { term: "reported", zh: "被报告的", tone: "中性，适合数据和治安讨论。", stance: "Neutral" },
    { term: "persistent", zh: "持续存在的", tone: "消极，强调长期治理失败。", stance: "Negative" }
  ],
  "verb::violent crime": [
    { term: "prevent", pattern: "prevent {object}", zh: "预防", tone: "积极，强调治安和社会服务。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "中性，强调数据和资源分配。", stance: "Neutral" },
    { term: "fuel", pattern: "fuel {object}", zh: "助长", tone: "消极，强调社会因素推高犯罪。", stance: "Negative" }
  ],
  "verb::diabetes": [
    { term: "manage", pattern: "manage {object}", zh: "管理", tone: "这条搭配适合讲通过饮食、用药和监测控制糖尿病。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "这条搭配适合持续观察血糖和病情变化。", stance: "Neutral" },
    { term: "leave untreated", pattern: "leave diabetes untreated", zh: "不治疗", tone: "这条搭配适合批判让糖尿病得不到治疗会增加并发症风险。", stance: "Negative" }
  ],
  "adjective::obesity": [
    { term: "morbid", zh: "病态的", tone: "医学语境，强调严重程度。", stance: "Negative" },
    { term: "severe", zh: "严重的", tone: "自然健康搭配。", stance: "Negative" },
    { term: "rising", zh: "上升的", tone: "强调趋势变差。", stance: "Negative" }
  ],
  "adjective::anxiety disorder": [
    { term: "acute", zh: "急性的", tone: "医学语境中可用。", stance: "Negative" },
    { term: "diagnosed", zh: "已诊断的", tone: "中性，强调专业确认。", stance: "Neutral" },
    { term: "severe", zh: "严重的", tone: "自然健康搭配。", stance: "Negative" }
  ],
  "verb::respiratory diseases": [
    { term: "treat", pattern: "treat {object}", zh: "治疗", tone: "积极，强调医疗干预。", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "监测", tone: "中性，适合公共卫生。", stance: "Neutral" },
    { term: "aggravate", pattern: "aggravate {object}", zh: "加重", tone: "消极，强调污染等因素使疾病恶化。", stance: "Negative" }
  ],
  "adjective::diabetes": [
    { term: "manageable", zh: "可管理的", tone: "积极，强调可通过治疗和生活方式控制。", stance: "Positive" },
    { term: "diagnosed", zh: "已诊断的", tone: "中性，强调医学确认。", stance: "Neutral" },
    { term: "uncontrolled", zh: "未受控制的", tone: "消极，强调并发症风险。", stance: "Negative" }
  ],
  "adjective::fast food culture": [
    { term: "convenience-driven", zh: "便利驱动的", tone: "中性，强调形成原因。", stance: "Neutral" },
    { term: "commercialized", zh: "商业化的", tone: "消极，强调市场推动。", stance: "Negative" },
    { term: "unhealthy", zh: "不健康的", tone: "消极，适合公共健康批判。", stance: "Negative" }
  ],
  "adjective::sedentary lifestyle": [
    { term: "screen-heavy", zh: "屏幕使用过多的", tone: "中性到消极，强调生活方式特征。", stance: "Negative" },
    { term: "inactive", zh: "缺乏活动的", tone: "消极，强调运动不足。", stance: "Negative" },
    { term: "work-related", zh: "与工作相关的", tone: "中性，适合解释成因。", stance: "Neutral" }
  ],
  "adjective::psychological counselling": [
    { term: "professional", zh: "专业的", tone: "积极，强调由专业人员提供。", stance: "Positive" },
    { term: "confidential", zh: "保密的", tone: "积极，强调隐私保护。", stance: "Positive" },
    { term: "inaccessible", zh: "难以获得的", tone: "消极，强调服务缺口。", stance: "Negative" }
  ],
  "adjective::self-care": [
    { term: "regular", zh: "规律的", tone: "积极，强调持续习惯。", stance: "Positive" },
    { term: "basic", zh: "基础的", tone: "中性，强调最低需要。", stance: "Neutral" },
    { term: "neglected", zh: "被忽视的", tone: "消极，强调照顾不足。", stance: "Negative" }
  ],
  "adjective::medical insurance": [
    { term: "affordable", zh: "负担得起的", tone: "积极，强调可及性。", stance: "Positive" },
    { term: "private", zh: "私营的", tone: "中性，描述保险类型。", stance: "Neutral" },
    { term: "inadequate", zh: "不足的", tone: "消极，强调保障不够。", stance: "Negative" }
  ],
  "adjective::shortage of medical resources": [
    { term: "temporary", zh: "暂时的", tone: "中性，强调时间范围。", stance: "Neutral" },
    { term: "regional", zh: "地区性的", tone: "中性，强调分布不均。", stance: "Neutral" },
    { term: "severe", zh: "严重的", tone: "消极，强调资源缺口大。", stance: "Negative" }
  ],
  "adjective::medical expenses": [
    { term: "manageable", zh: "可负担的", tone: "积极，强调压力可控。", stance: "Positive" },
    { term: "out-of-pocket", zh: "自付的", tone: "中性，适合医疗支付语境。", stance: "Neutral" },
    { term: "crippling", zh: "沉重到难以承受的", tone: "消极，强调经济压力。", stance: "Negative" }
  ],
  "adjective::doctor-patient relationship": [
    { term: "trusting", zh: "互相信任的", tone: "积极，强调沟通基础。", stance: "Positive" },
    { term: "professional", zh: "专业的", tone: "中性到积极。", stance: "Neutral" },
    { term: "strained", zh: "紧张的", tone: "消极，强调关系冲突。", stance: "Negative" }
  ],
  "adjective::health check-up": [
    { term: "annual", zh: "年度的", tone: "中性，常见健康搭配。", stance: "Neutral" },
    { term: "routine", zh: "常规的", tone: "中性，强调定期检查。", stance: "Neutral" },
    { term: "comprehensive", zh: "全面的", tone: "积极，强调覆盖项目多。", stance: "Positive" }
  ],
  "adjective::health screening": [
    { term: "early", zh: "早期的", tone: "积极，强调提前发现。", stance: "Positive" },
    { term: "routine", zh: "常规的", tone: "中性，适合公共卫生。", stance: "Neutral" },
    { term: "delayed", zh: "延迟的", tone: "消极，强调错过时机。", stance: "Negative" }
  ],
  "adjective::health promotion": [
    { term: "community-based", zh: "社区层面的", tone: "积极，强调贴近居民。", stance: "Positive" },
    { term: "school-based", zh: "学校层面的", tone: "中性，强调场景。", stance: "Neutral" },
    { term: "underfunded", zh: "资金不足的", tone: "消极，强调执行困难。", stance: "Negative" }
  ],
  "adjective::addiction treatment": [
    { term: "long-term", zh: "长期的", tone: "中性，强调治疗周期。", stance: "Neutral" },
    { term: "evidence-based", zh: "循证的", tone: "积极，强调科学依据。", stance: "Positive" },
    { term: "inadequate", zh: "不足的", tone: "消极，强调治疗缺口。", stance: "Negative" }
  ]
};

const ADJECTIVE_COLLOCATION_BANKS = {
  problem: [
    { term: "preventable", zh: "可预防的", tone: "这条搭配适合讲问题可以通过行动减少。", stance: "Positive" },
    { term: "manageable", zh: "可管理的", tone: "这条搭配适合讲问题仍然可以被控制。", stance: "Positive" },
    { term: "underlying", zh: "潜在的 / 深层的", tone: "这条搭配适合分析问题背后的原因。", stance: "Neutral" },
    { term: "reported", zh: "被报告的", tone: "这条搭配适合数据、新闻或调查语境。", stance: "Neutral" },
    { term: "persistent", zh: "持续存在的", tone: "这条搭配适合批判问题长期未解决。", stance: "Negative" },
    { term: "unresolved", zh: "未解决的", tone: "这条搭配适合强调问题仍然存在。", stance: "Negative" },
    { term: "escalating", zh: "不断升级的", tone: "这条搭配适合强调趋势正在变坏。", stance: "Negative" }
  ],
  system: [
    { term: "accountable", zh: "可问责的", tone: "这条搭配适合制度、学校和公共服务。", stance: "Positive" },
    { term: "transparent", zh: "透明的", tone: "这条搭配适合强调公开和可监督。", stance: "Positive" },
    { term: "formal", zh: "正式的", tone: "这条搭配适合描述组织或制度属性。", stance: "Neutral" },
    { term: "regulated", zh: "受监管的", tone: "这条搭配适合客观说明制度受到规则约束。", stance: "Neutral" },
    { term: "under-regulated", zh: "监管不足的", tone: "这条搭配适合批判制度缺口。", stance: "Negative" },
    { term: "inconsistent", zh: "不一致的", tone: "这条搭配适合批判执行标准不统一。", stance: "Negative" },
    { term: "outdated", zh: "过时的", tone: "这条搭配适合批判制度不适应现实。", stance: "Negative" }
  ],
  technology: [
    { term: "secure", zh: "安全的", tone: "这条搭配适合强调风险被控制。", stance: "Positive" },
    { term: "reliable", zh: "可靠的", tone: "这条搭配适合强调稳定可用。", stance: "Positive" },
    { term: "traceable", zh: "可追踪的", tone: "这条搭配适合数据、犯罪和供应链语境。", stance: "Neutral" },
    { term: "experimental", zh: "实验性的", tone: "这条搭配适合强调仍在试用或探索。", stance: "Neutral" },
    { term: "vulnerable", zh: "脆弱的 / 易受攻击的", tone: "这条搭配适合强调安全风险。", stance: "Negative" },
    { term: "unregulated", zh: "缺乏监管的", tone: "这条搭配适合批判治理缺口。", stance: "Negative" },
    { term: "privacy-sensitive", zh: "涉及隐私的", tone: "这条搭配适合数据和平台语境。", stance: "Neutral" }
  ],
  general: [
    { term: "valuable", zh: "有价值的", tone: "这条搭配适合强调实际作用。", stance: "Positive" },
    { term: "practical", zh: "实用的", tone: "这条搭配适合强调可执行性。", stance: "Positive" },
    { term: "meaningful", zh: "有意义的", tone: "这条搭配适合强调真实价值或影响。", stance: "Positive" },
    { term: "long-term", zh: "长期的", tone: "这条搭配适合强调时间维度。", stance: "Neutral" },
    { term: "context-specific", zh: "因语境而异的", tone: "这条搭配适合中性分析不同场景。", stance: "Neutral" },
    { term: "measurable", zh: "可衡量的", tone: "这条搭配适合数据或效果评估语境。", stance: "Neutral" },
    { term: "problematic", zh: "有问题的", tone: "这条搭配适合批判性论述。", stance: "Negative" },
    { term: "controversial", zh: "有争议的", tone: "这条搭配适合公共讨论语境。", stance: "Negative" },
    { term: "limited", zh: "有限的", tone: "这条搭配适合批判作用或覆盖面不足。", stance: "Negative" }
  ]
};

const VERB_COLLOCATION_BANKS = {
  problem: [
    { term: "prevent", pattern: "prevent {object}", zh: "\u9884\u9632", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u4e3b\u52a8\u51cf\u5c11\u98ce\u9669\u3002", stance: "Positive" },
    { term: "monitor", pattern: "monitor {object}", zh: "\u76d1\u6d4b / \u5173\u6ce8", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u63cf\u8ff0\u6301\u7eed\u89c2\u5bdf\u3002", stance: "Neutral" },
    { term: "worsen", pattern: "worsen {object}", zh: "\u4f7f\u2026\u2026\u6076\u5316", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u7528\u4e8e\u6279\u5224\u4e0d\u826f\u653f\u7b56\u6216\u884c\u4e3a\u7684\u540e\u679c\u3002", stance: "Negative" }
  ],
  system: [
    { term: "strengthen", pattern: "strengthen {object}", zh: "\u52a0\u5f3a", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u8ba9\u5236\u5ea6\u6216\u80fd\u529b\u66f4\u7a33\u3002", stance: "Positive" },
    { term: "review", pattern: "review {object}", zh: "\u5ba1\u67e5 / \u590d\u76d8", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u8c08\u8bc4\u4f30\u548c\u6539\u8fdb\u524d\u7684\u5224\u65ad\u3002", stance: "Neutral" },
    { term: "weaken", pattern: "weaken {object}", zh: "\u524a\u5f31", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u7528\u4e8e\u63cf\u8ff0\u7834\u574f\u6027\u5f71\u54cd\u3002", stance: "Negative" }
  ],
  opportunity: [
    { term: "expand", pattern: "expand {object}", zh: "\u6269\u5927", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u589e\u52a0\u8986\u76d6\u9762\u6216\u673a\u4f1a\u3002", stance: "Positive" },
    { term: "measure", pattern: "measure {object}", zh: "\u8861\u91cf / \u8bc4\u4f30", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u6570\u636e\u6216\u653f\u7b56\u5206\u6790\u3002", stance: "Neutral" },
    { term: "limit", pattern: "limit {object}", zh: "\u9650\u5236", tone: "\u6d88\u6781\u6216\u8b66\u793a\u8bed\u6c14\uff0c\u5f3a\u8c03\u673a\u4f1a\u88ab\u538b\u7f29\u3002", stance: "Negative" }
  ],
  general: [
    { term: "promote", pattern: "promote {object}", zh: "\u4fc3\u8fdb / \u63a8\u52a8", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u9002\u5408\u63d0\u51fa\u6539\u5584\u65b9\u5411\u6216\u5021\u5bfc\u67d0\u79cd\u505a\u6cd5\u3002", stance: "Positive" },
    { term: "maintain", pattern: "maintain {object}", zh: "\u4fdd\u6301 / \u7ef4\u6301", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u628a\u6709\u4ef7\u503c\u7684\u72b6\u6001\u7a33\u5b9a\u4f4f\u3002", stance: "Positive" },
    { term: "develop", pattern: "develop {object}", zh: "\u53d1\u5c55 / \u57f9\u517b", tone: "\u79ef\u6781\u8bed\u6c14\uff0c\u9002\u5408\u80fd\u529b\u3001\u4e60\u60ef\u3001\u670d\u52a1\u6216\u957f\u671f\u65b9\u5411\u3002", stance: "Positive" },
    { term: "analyse", pattern: "analyse {object}", zh: "\u5206\u6790", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u5ba2\u89c2\u62c6\u89e3\u6210\u56e0\u3001\u5f71\u54cd\u6216\u53d8\u5316\u3002", stance: "Neutral" },
    { term: "discuss", pattern: "discuss {object}", zh: "\u8ba8\u8bba", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u9002\u5408\u5f15\u51fa\u8bae\u9898\u6216\u89c2\u70b9\u5bf9\u6bd4\u3002", stance: "Neutral" },
    { term: "assess", pattern: "assess {object}", zh: "\u8bc4\u4f30", tone: "\u4e2d\u6027\u8bed\u6c14\uff0c\u66f4\u504f\u5206\u6790\u548c\u5224\u65ad\u3002", stance: "Neutral" },
    { term: "sideline", pattern: "sideline {object}", zh: "\u8fb9\u7f18\u5316", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u7528\u4e8e\u6279\u5224\u67d0\u4e2a\u8bae\u9898\u6216\u7fa4\u4f53\u88ab\u653e\u5230\u6b21\u8981\u4f4d\u7f6e\u3002", stance: "Negative" }
    ,
    { term: "undermine", pattern: "undermine {object}", zh: "\u635f\u5bb3 / \u524a\u5f31", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u5f3a\u8c03\u9010\u6b65\u7834\u574f\u67d0\u79cd\u4ef7\u503c\u6216\u6548\u679c\u3002", stance: "Negative" },
    { term: "overlook", pattern: "overlook {object}", zh: "\u5ffd\u7565", tone: "\u6d88\u6781\u8bed\u6c14\uff0c\u9002\u5408\u6279\u5224\u8ba8\u8bba\u6216\u653f\u7b56\u4e2d\u7684\u76f2\u70b9\u3002", stance: "Negative" }
  ]
};

const TOPIC_VERB_BANKS = {
  Technology: [
    { term: "integrate", pattern: "integrate {object}", zh: "\u6574\u5408", stance: "Positive" },
    { term: "upgrade", pattern: "upgrade {object}", zh: "\u5347\u7ea7", stance: "Positive" },
    { term: "scale up", pattern: "scale up {object}", zh: "\u6269\u5927\u5e94\u7528", stance: "Positive" },
    { term: "pilot", pattern: "pilot {object}", zh: "\u8bd5\u70b9", stance: "Neutral" },
    { term: "audit", pattern: "audit {object}", zh: "\u5ba1\u67e5", stance: "Neutral" },
    { term: "benchmark", pattern: "benchmark {object}", zh: "\u5bf9\u6807\u8bc4\u4f30", stance: "Neutral" },
    { term: "regulate", pattern: "regulate {object}", zh: "\u76d1\u7ba1", stance: "Neutral" },
    { term: "misuse", pattern: "misuse {object}", zh: "\u6ee5\u7528", stance: "Negative" },
    { term: "overuse", pattern: "overuse {object}", zh: "\u8fc7\u5ea6\u4f7f\u7528", stance: "Negative" },
    { term: "phase out", pattern: "phase out {object}", zh: "\u9010\u6b65\u6dd8\u6c70", stance: "Negative" },
    { term: "underuse", pattern: "underuse {object}", zh: "\u4f7f\u7528\u4e0d\u8db3", stance: "Negative" }
  ]
};

const TOPIC_ADJECTIVE_BANKS = {
  Health: [
    { term: "preventive", zh: "预防性的", tone: "积极，适合健康服务和公共卫生。", stance: "Positive" },
    { term: "clinical", zh: "临床的", tone: "中性，适合疾病和治疗语境。", stance: "Neutral" },
    { term: "lifestyle-related", zh: "与生活方式相关的", tone: "中性分析语气。", stance: "Neutral" },
    { term: "routine", zh: "常规的", tone: "中性，适合检查、接种和护理。", stance: "Neutral" },
    { term: "untreated", zh: "未治疗的", tone: "消极，强调健康风险。", stance: "Negative" },
    { term: "uncontrolled", zh: "未受控制的", tone: "消极，适合疾病和症状。", stance: "Negative" },
    { term: "rising", zh: "上升的", tone: "消极，强调趋势变坏。", stance: "Negative" }
  ],
  Arts: [
    { term: "expressive", zh: "富有表现力的", tone: "积极，强调艺术表达。", stance: "Positive" },
    { term: "vibrant", zh: "有活力的", tone: "积极，强调文化生命力。", stance: "Positive" },
    { term: "contemporary", zh: "当代的", tone: "中性，强调时代风格。", stance: "Neutral" },
    { term: "traditional", zh: "传统的", tone: "中性，强调文化来源。", stance: "Neutral" },
    { term: "commercialized", zh: "商业化的", tone: "消极，适合批判逐利倾向。", stance: "Negative" },
    { term: "derivative", zh: "缺乏原创性的", tone: "消极，适合艺术批评。", stance: "Negative" },
    { term: "censored", zh: "受审查的", tone: "消极，适合表达自由话题。", stance: "Negative" }
  ],
  Economy: [
    { term: "stable", zh: "稳定的", tone: "积极，适合经济指标和市场。", stance: "Positive" },
    { term: "measurable", zh: "可衡量的", tone: "中性，适合数据分析。", stance: "Neutral" },
    { term: "structural", zh: "结构性的", tone: "中性分析语气。", stance: "Neutral" },
    { term: "volatile", zh: "波动大的", tone: "消极，适合市场和价格。", stance: "Negative" },
    { term: "unaffordable", zh: "难以负担的", tone: "消极，适合费用和生活成本。", stance: "Negative" }
  ],
  Media: [
    { term: "credible", zh: "可信的", tone: "积极，适合新闻和信息。", stance: "Positive" },
    { term: "mainstream", zh: "主流的", tone: "中性，强调传播位置。", stance: "Neutral" },
    { term: "algorithmic", zh: "算法驱动的", tone: "中性，适合平台语境。", stance: "Neutral" },
    { term: "sensationalist", zh: "耸人听闻的", tone: "消极，适合媒体批判。", stance: "Negative" },
    { term: "misleading", zh: "误导性的", tone: "消极，强调信息风险。", stance: "Negative" }
  ],
  Urbanization: [
    { term: "compact", zh: "紧凑型的", tone: "积极，适合城市规划。", stance: "Positive" },
    { term: "high-density", zh: "高密度的", tone: "中性，描述城市形态。", stance: "Neutral" },
    { term: "suburban", zh: "郊区的", tone: "中性，描述空间位置。", stance: "Neutral" },
    { term: "congested", zh: "拥堵的", tone: "消极，强调城市压力。", stance: "Negative" },
    { term: "overcrowded", zh: "过度拥挤的", tone: "消极，强调人口压力。", stance: "Negative" }
  ]
};

const REPETITIVE_VERB_TERMS = new Set(["support", "improve"]);

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

const SYNONYM_CURATED_OPTIONS = window.SYNONYM_CURATED_OPTIONS || {};

function normalizeSynonymKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s*\/\s*.*/, "")
    .replace(/^highly\s+/, "")
    .trim();
}

function normalizeBaseKey(card) {
  return normalizeSynonymKey(card.baseEnglish)
    .replace(/^(a|an|the)\s+/, "")
    .replace(/\s+/g, " ");
}

function collocationProfile(card) {
  const text = `${card.baseEnglish} ${card.backEnglish}`.toLowerCase();
  if (/\b(crime|violence|delinquency|discrimination|inequality|poverty|pressure|cyberbullying|bullying|misinformation|breach|overload|screen time|pollution|disease|obesity|diabetes|depression|anxiety|blood pressure|mental health|shortage|addiction|homelessness|exclusion)\b/.test(text)) {
    return "problem";
  }
  if (/\b(system|school|policy|government|law|regulation|welfare|education|health care|infrastructure|organization|curriculum|assessment)\b/.test(text)) {
    return "system";
  }
  if (/\b(technology|digital|cyber|data|online|automation|ai|virtual|software|platform)\b/.test(text)) {
    return "technology";
  }
  if (/\b(opportunity|participation|mobility|access|work|learning|culture|community|service)\b/.test(text)) {
    return "opportunity";
  }
  return "general";
}

function getCollocationObject(card) {
  const back = String(card.backEnglish || "").trim();
  const highlight = String(card.highlightEnglish || "").trim();
  const base = normalizeSynonymKey(card.baseEnglish);
  if (card.type === "verb" && highlight) {
    const pattern = new RegExp(`^${escapeRegExp(highlight)}\\s+`, "i");
    const object = back.replace(pattern, "").trim();
    if (object && object !== back) return object;
  }
  return base || back;
}

function normalizeManualCollocationKey(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function manualCollocationKey(card) {
  return `${card.topic}::${card.type}::${normalizeManualCollocationKey(card.backEnglish)}`;
}

function curatedCollocationKey(card) {
  return `${card.topic}::${card.type}::${card.backEnglish}`;
}

function curatedOptions(card) {
  const entry = SYNONYM_CURATED_OPTIONS[curatedCollocationKey(card)];
  if (!entry || !Array.isArray(entry.options) || entry.options.length === 0) return null;
  return entry.options;
}

function manualEducationOptions(card) {
  return (
    EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS[manualCollocationKey(card)] ||
    EDUCATION_MANUAL_OPTIONAL_COLLOCATIONS[`${card.type}::${normalizeBaseKey(card)}`] ||
    null
  );
}

function markManualOptions(options) {
  return options.map((option) => ({ ...option, manual: true }));
}

function uniqueDraftOptions(drafts) {
  const seen = new Set();
  const unique = [];
  drafts.forEach((draft) => {
    const key = `${draft.term || ""}::${draft.pattern || ""}::${draft.phrase || ""}`.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    unique.push(draft);
  });
  return unique;
}

function adjectiveBankForCard(card, profile) {
  return [
    ...(TOPIC_ADJECTIVE_BANKS[card.topic] || []),
    ...(ADJECTIVE_COLLOCATION_BANKS[profile] || []),
    ...(ADJECTIVE_COLLOCATION_BANKS.general || [])
  ];
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

function getSynonymDrafts(card) {
  const options = curatedOptions(card);
  if (options) return markManualOptions(options);
  const manualOptions = manualEducationOptions(card);
  if (manualOptions) return markManualOptions(manualOptions);
  const profile = collocationProfile(card);
  const typedBaseKey = `${card.type}::${normalizeBaseKey(card)}`;
  const overrideOptions = COLLOCATION_OVERRIDES[typedBaseKey] || [];
  if (overrideOptions.length) return overrideOptions;
  const typedBaseDrafts = SYNONYM_DRAFTS[typedBaseKey] || [];
  if (typedBaseDrafts.length) return typedBaseDrafts;
  const highlightKey = normalizeSynonymKey(card.highlightEnglish);
  const baseKey = normalizeBaseKey(card);
  const drafts = uniqueDraftOptions([
    ...(SYNONYM_DRAFTS[highlightKey] || []),
    ...(SYNONYM_DRAFTS[baseKey] || [])
  ]);
  if (card.type === "verb") {
    return balanceVerbStances(card, drafts);
  }
  return balanceAdjectiveStances(card, uniqueDraftOptions([
    ...drafts,
    ...adjectiveBankForCard(card, profile)
  ]));
}

function verbBankForCard(card, profile) {
  if (profile === "technology" && TOPIC_VERB_BANKS[card.topic]) {
    return TOPIC_VERB_BANKS[card.topic];
  }
  return VERB_COLLOCATION_BANKS[profile] || VERB_COLLOCATION_BANKS.general;
}

function rotateDrafts(drafts, seedText) {
  if (!drafts.length) return drafts;
  const seed = Array.from(String(seedText || "")).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const offset = seed % drafts.length;
  return [...drafts.slice(offset), ...drafts.slice(0, offset)];
}

function balanceVerbStances(card, drafts) {
  const profile = collocationProfile(card);
  const bank = rotateDrafts(verbBankForCard(card, profile), card.backEnglish);
  const seed = Array.from(String(card.backEnglish || "")).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const merged = [...drafts, ...bank].filter((draft) => !REPETITIVE_VERB_TERMS.has(draft.term));
  const selected = [];
  ["Positive", "Neutral", "Negative"].forEach((stance) => {
    const candidates = merged.filter((draft) => draft.stance === stance && !selected.some((item) => item.term === draft.term));
    const option = candidates.length ? candidates[seed % candidates.length] : null;
    if (option) selected.push(option);
  });
  merged.forEach((draft) => {
    if (selected.length < 4 && !selected.some((item) => item.term === draft.term)) selected.push(draft);
  });
  return selected;
}

function balanceAdjectiveStances(card, drafts) {
  const seed = Array.from(String(card.backEnglish || "")).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const selected = [];
  ["Positive", "Neutral", "Negative"].forEach((stance) => {
    const candidates = drafts.filter((draft) => draft.stance === stance && !selected.some((item) => item.term === draft.term));
    const option = candidates.length ? candidates[seed % candidates.length] : null;
    if (option) selected.push(option);
  });
  rotateDrafts(drafts, card.backEnglish).forEach((draft) => {
    if (selected.length < 3 && !selected.some((item) => item.term === draft.term)) selected.push(draft);
  });
  return selected;
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

function buildAlternativeExpression(card, draft) {
  const synonymTerm = typeof draft === "string" ? draft : draft.term;
  const object = getCollocationObject(card);
  if (draft && draft.pattern) {
    return draft.pattern.replace(/\{object\}/g, object).replace(/\s+/g, " ").trim();
  }
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
  if (option.stance === "Negative") {
    return `In ${context}, policies or habits that ${phrase} can leave ${scene} with fewer options and higher long-term costs.`;
  }
  if (option.stance === "Neutral") {
    return `In ${context}, ${phrase} helps ${scene} describe the issue more precisely before choosing a solution.`;
  }
  return `In ${context}, ${subject} can help ${scene} ${endings[context]}.`;
}

function fullCollocationTone(card, option, phrase) {
  if (option.tone) return option.tone;
  const object = getCollocationObject(card);
  const profile = collocationProfile(card);
  if (card.type === "verb") {
    const term = String(option.term || "").toLowerCase();
    if (["take up", "employ", "apply", "make use of", "use"].includes(term)) {
      return `这条搭配适合客观描述个人、学校或机构开始采用「${object}」的做法。`;
    }
    if (["pilot", "trial"].includes(term)) {
      return `这条搭配适合讲先小范围试用「${object}」，再判断是否值得推广。`;
    }
    if (["audit", "evaluate", "assess", "benchmark"].includes(term)) {
      return `这条搭配适合讲系统检查「${object}」的效果、成本、安全性或公平性。`;
    }
    if (["regulate", "manage"].includes(term)) {
      return `这条搭配适合讲给「${object}」设规则、控风险，而不是简单支持或反对。`;
    }
    if (["phase out"].includes(term)) {
      return `这条搭配适合讲逐步淘汰过时、低效或风险较高的「${object}」。`;
    }
    if (["underuse"].includes(term)) {
      return `这条搭配适合批判「${object}」明明有帮助却没有被充分使用。`;
    }
    if (["overuse"].includes(term)) {
      return `这条搭配适合批判「${object}」被过度使用，反而带来依赖、成本或公平问题。`;
    }
    if (["misuse"].includes(term)) {
      return `这条搭配适合批判「${object}」被用于错误、有害或不道德的目的。`;
    }
    if (["integrate", "upgrade", "scale up", "deploy"].includes(term)) {
      return `这条搭配适合讲把「${object}」更系统地投入实际场景，提升效率或服务质量。`;
    }
    if (profile === "problem") {
      if (option.stance === "Positive") {
        return `这条搭配适合讲如何减少、预防或控制「${object}」这类问题。`;
      }
      if (option.stance === "Neutral") {
        return `这条搭配适合讲如何记录、监测或分析「${object}」的规模和变化。`;
      }
      return `这条搭配适合批判某种行为、平台或政策如何加剧「${object}」。`;
    }
    if (option.stance === "Positive") {
      return `这条搭配适合讲如何主动推动或改善「${object}」，重点是行动带来的实际效果。`;
    }
    if (option.stance === "Neutral") {
      return `这条搭配适合把「${object}」作为需要测试、监管、比较或评估的对象，语气偏分析。`;
    }
    return `这条搭配适合批判「${object}」被误用、过度使用、忽视或造成反效果的情况。`;
  }
  if (option.stance === "Positive") {
    return `这条搭配适合强调「${phrase}」的价值、效果或可取之处。`;
  }
  if (option.stance === "Neutral") {
    return `这条搭配适合客观描述「${phrase}」的类型、范围或具体属性。`;
  }
  return `这条搭配适合批判「${phrase}」带来的风险、缺口或负面影响。`;
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
  return drafts.slice(0, 3).map((draft) => {
    if (draft.manual) {
      const phrase = draft.pattern || draft.phrase || buildAlternativeExpression(card, draft);
      const microContext = draft.microContext || pickMicroContext(card.topic, `${card.backEnglish}-${draft.term}`);
      const option = { ...draft, phrase, microContext };
      option.tone = fullCollocationTone(card, option, phrase);
      option.reviewNote = "Manually authored card-level optional collocation.";
      option.reviewPassed = true;
      option.reviewIssues = [];
      return option;
    }
    QUALITY_REVIEW_REPORT.reviewedOptions += 1;
    const phrase = buildAlternativeExpression(card, draft);
    const microContext = draft.microContext || pickMicroContext(card.topic, `${card.backEnglish}-${draft.term}`);
    let option = { ...draft, phrase, microContext };
    option.tone = fullCollocationTone(card, option, phrase);
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
  const drafts = getSynonymDrafts(card);
  if (!drafts.length) return [];
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
