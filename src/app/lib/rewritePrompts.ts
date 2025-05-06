interface RewriteConfig {
  style: string;
  humanize_tips: string[];
  rewrite_instruction: string;
}

interface RewritePrompts {
  [key: string]: RewriteConfig;
}

export const rewritePrompts: RewritePrompts = {
  '全部': {
    style: '通用写作风格',
    humanize_tips: [
      '使用生动的比喻和类比',
      '加入个人经历和感悟',
      '运用具体的数据和案例',
      '注重情感共鸣',
      '保持逻辑性和可读性'
    ],
    rewrite_instruction: '请将文章改写为具有真实感、自然表达的公众号爆文风格，模仿人类写作方式，逻辑清晰、有洞察、有场景。'
  },
  '科技': {
    style: '科技领域写作风格',
    humanize_tips: [
      '解释技术原理要通俗易懂',
      '结合最新科技趋势',
      '关注用户实际需求',
      '分析技术发展前景',
      '提供实用建议'
    ],
    rewrite_instruction: '请将文章改写为具有真实感、自然表达的科技爆文风格，模仿人类写作方式，逻辑清晰、有洞察、有场景。'
  },
  '生活': {
    style: '生活领域写作风格',
    humanize_tips: [
      '贴近日常生活场景',
      '分享实用生活技巧',
      '关注生活品质提升',
      '传递积极生活态度',
      '注重情感共鸣'
    ],
    rewrite_instruction: '将原文改写为富有生活气息的公众号爆款，适合微信公众号发布，体现强烈的生活代入感与真实情感。'
  },
  '情感': {
    style: '情感领域写作风格',
    humanize_tips: [
      '增加真实对话',
      '加入第一人称',
      '刻画内心活动',
      '分享个人感悟',
      '注重情感共鸣'
    ],
    rewrite_instruction: '将原文改写为富有情感共鸣的公众号爆款，适合微信公众号发布，体现强烈的生活代入感与真实情绪。'
  },
  '职场': {
    style: '职场领域写作风格',
    humanize_tips: [
      '结合真实职场案例',
      '分享实用职场经验',
      '分析职场现象',
      '提供职业发展建议',
      '注重实用性'
    ],
    rewrite_instruction: '将文章改写为实用的职场经验分享，模仿资深职场人士的写作风格，真实、专业、有深度。'
  },
  '教育': {
    style: '教育领域写作风格',
    humanize_tips: [
      '结合教育实践案例',
      '分享教育经验',
      '分析教育现象',
      '提供教育建议',
      '注重实用性'
    ],
    rewrite_instruction: '将文章改写为专业的教育经验分享，模仿资深教育工作者的写作风格，真实、专业、有深度。'
  },
  '健康': {
    style: '健康领域写作风格',
    humanize_tips: [
      '结合健康知识',
      '分享养生经验',
      '分析健康现象',
      '提供健康建议',
      '注重科学性'
    ],
    rewrite_instruction: '将文章改写为专业的健康知识分享，模仿健康领域专家的写作风格，真实、专业、有深度。'
  },
  '财经': {
    style: '财经领域写作风格',
    humanize_tips: [
      '结合财经案例',
      '分享投资经验',
      '分析经济现象',
      '提供理财建议',
      '注重专业性'
    ],
    rewrite_instruction: '将文章改写为专业的财经分析，模仿资深财经作者的写作风格，真实、专业、有深度。'
  },
  '娱乐': {
    style: '娱乐领域写作风格',
    humanize_tips: [
      '结合娱乐热点',
      '分享娱乐观点',
      '分析娱乐现象',
      '提供娱乐资讯',
      '注重趣味性'
    ],
    rewrite_instruction: '将文章改写为有趣的娱乐资讯，模仿娱乐记者的写作风格，轻松、活泼、有看点。'
  }
}; 