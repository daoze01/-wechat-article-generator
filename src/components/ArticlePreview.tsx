import { useRef } from "react";

export default function ArticlePreview({ title, content }: { title: string; content: string }) {
  const articleRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    if (articleRef.current) {
      try {
        // 创建一个临时的div来获取格式化后的文本
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = articleRef.current.innerHTML;
        
        // 构建格式化的文本内容
        let formattedText = '';
        
        // 添加标题
        formattedText += title + '\n\n';
        
        // 添加作者信息
        formattedText += '阅读量：3k+    |    作者：AI助手\n\n';
        
        // 处理正文内容
        const paragraphs = content.split('\n\n');
        paragraphs.forEach((paragraph, index) => {
          if (paragraph.trim()) {
            if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
              // 处理列表项
              paragraph.split('\n').forEach(item => {
                formattedText += '• ' + item.trim().replace(/^[•-]\s*/, '') + '\n';
              });
              formattedText += '\n';
            } else if (paragraph.length < 50 && (paragraph.endsWith('？') || paragraph.endsWith('?'))) {
              // 处理问句作为小标题
              formattedText += '\n' + paragraph.trim() + '\n\n';
            } else if (paragraph.length < 50 && paragraph.includes('：')) {
              // 处理小标题
              formattedText += '\n' + paragraph.trim() + '\n\n';
            } else {
              // 处理普通段落
              const sentences = paragraph.split(/(?<=[。！？；.!?;])\s*/);
              let currentParagraph = '';
              
              sentences.forEach((sentence) => {
                if ((currentParagraph + sentence).length > 80) {
                  if (currentParagraph) {
                    formattedText += currentParagraph.trim() + '\n';
                    currentParagraph = '';
                  }
                }
                currentParagraph += sentence;
              });
              
              if (currentParagraph) {
                formattedText += currentParagraph.trim() + '\n';
              }
              formattedText += '\n';
            }
          }
          
          // 每隔几个段落添加分隔符
          if (index > 0 && index % 3 === 0 && index !== paragraphs.length - 1) {
            formattedText += '• • •\n\n';
          }
        });
        
        // 添加底部信息
        formattedText += '\n—————————\n';
        formattedText += '欢迎点赞、在看、分享和评论\n';

        await navigator.clipboard.writeText(formattedText);
        alert("文章内容已复制，可直接粘贴到公众号编辑器！");
      } catch (err) {
        alert("复制失败，请手动复制");
      }
    }
  };

  // 将文本内容转换为HTML格式
  const contentToHtml = (text: string) => {
    const paragraphs = text.split('\n\n');
    let html = '';
    let sectionCount = 1;
    
    paragraphs.forEach((paragraph, index) => {
      if (paragraph.trim()) {
        // 将长段落分割成较短的段落（每段大约60-80个字）
        const sentences = paragraph.split(/(?<=[。！？；.!?;])\s*/);
        let currentParagraph = '';
        let paragraphHtml = '';

        if (index === 0) {
          // 开头段落特殊处理
          paragraphHtml += `<p style="color: #333; font-size: 17px; text-align: justify; line-height: 1.8; margin-bottom: 20px; text-indent: 2em;">
            ${paragraph.trim()}
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; margin: 0 8px; font-size: 18px; color: #1890ff;">✦ ❈ ✦</span>
          </div>`;
        } else if (paragraph.trim().startsWith('•') || paragraph.trim().startsWith('-')) {
          // 处理列表项
          const items = paragraph.split('\n').map(item => 
            `<li style="color: #333; font-size: 16px; line-height: 1.8; margin: 10px 0; list-style: none;">
              <span style="color: #1890ff; margin-right: 8px;">▪</span>${item.trim().replace(/^[•-]\s*/, '')}
            </li>`
          ).join('');
          paragraphHtml += `<ul style="padding-left: 0; margin: 15px 0;">${items}</ul>`;
        } else if (paragraph.length < 50 && (paragraph.endsWith('？') || paragraph.endsWith('?'))) {
          // 处理问句作为小标题
          paragraphHtml += `
          <div style="margin: 25px 0 15px;">
            <h3 style="position: relative; color: #1890ff; font-size: 20px; font-weight: bold; padding-left: 15px; margin: 0;">
              <span style="position: absolute; left: 0; top: 50%; transform: translateY(-50%); width: 4px; height: 20px; background-color: #1890ff;"></span>
              ${paragraph.trim()}
            </h3>
          </div>`;
        } else if (paragraph.length < 50 && paragraph.includes('：')) {
          // 处理小标题（带冒号的短句）
          paragraphHtml += `
          <div style="margin: 25px 0 15px;">
            <h3 style="color: #1890ff; font-size: 19px; font-weight: bold;">
              ${paragraph.trim()}
            </h3>
          </div>`;
        } else {
          // 处理普通段落，将长段落分割成较短的段落
          sentences.forEach((sentence) => {
            if ((currentParagraph + sentence).length > 80) {
              if (currentParagraph) {
                paragraphHtml += `<p style="color: #333; font-size: 16px; text-align: justify; line-height: 1.8; margin: 12px 0; text-indent: 2em;">
                  ${currentParagraph}
                </p>`;
                currentParagraph = '';
              }
            }
            currentParagraph += sentence;
          });
          
          if (currentParagraph) {
            paragraphHtml += `<p style="color: #333; font-size: 16px; text-align: justify; line-height: 1.8; margin: 12px 0; text-indent: 2em;">
              ${currentParagraph}
            </p>`;
          }
        }

        html += paragraphHtml;

        // 每隔几个段落添加分隔符
        if (sectionCount % 3 === 0 && index !== paragraphs.length - 1) {
          html += `<div style="text-align: center; margin: 20px 0;">
            <span style="display: inline-block; margin: 0 8px; font-size: 18px; color: #1890ff;">• • •</span>
          </div>`;
        }
        sectionCount++;
      }
    });

    return html;
  };

  const htmlContent = `
    <div style="padding: 20px 0;">
      <h1 style="color: #1890ff; font-size: 26px; font-weight: bold; text-align: center; margin-bottom: 20px; position: relative;">
        <span style="display: inline-block; position: relative;">
          ${title}
          <span style="position: absolute; bottom: -10px; left: 0; width: 100%; height: 3px; background-color: #1890ff; opacity: 0.3;"></span>
        </span>
      </h1>
      <div style="text-align: center; margin-bottom: 30px;">
        <span style="color: #888; font-size: 14px;">阅读量：3k+</span>
        <span style="margin: 0 15px; color: #888;">|</span>
        <span style="color: #888; font-size: 14px;">作者：AI助手</span>
      </div>
      ${contentToHtml(content)}
      <div style="text-align: center; margin: 40px 0 20px;">
        <span style="display: inline-block; margin: 0 8px; font-size: 18px; color: #1890ff;">❋ ❋ ❋</span>
      </div>
      <p style="color: #888; font-size: 14px; text-align: center; margin-top: 20px;">
        欢迎点赞、在看、分享和评论
      </p>
    </div>
  `;

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4 py-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        复制全文
      </button>

      <div
        ref={articleRef}
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
} 