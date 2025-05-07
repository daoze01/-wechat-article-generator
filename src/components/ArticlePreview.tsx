import { useRef, useEffect, useState } from "react";
import { message } from "antd";
import "antd/dist/reset.css";

export default function ArticlePreview({ title, content }: { title: string; content: string }) {
  const articleRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // 检测设备类型
  useEffect(() => {
    const checkMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    setIsMobile(checkMobile());
  }, []);

  // 降级复制方法1: 使用document.execCommand
  const fallbackCopyTextToClipboard = (text: string): boolean => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // 设置样式使文本域不可见
    textArea.style.position = 'fixed';
    textArea.style.left = '0';
    textArea.style.top = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    
    document.body.appendChild(textArea);
    
    // 特别处理iOS设备
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      // 为iOS设备优化
      textArea.style.fontSize = '16px'; // 防止缩放
      textArea.style.position = 'absolute';
      textArea.style.left = '-9999px';
      textArea.contentEditable = 'true';
      textArea.readOnly = false;
      
      const range = document.createRange();
      range.selectNodeContents(textArea);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      textArea.setSelectionRange(0, 999999);
    } else {
      textArea.select();
    }
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      console.error('execCommand复制失败', err);
    }
    
    document.body.removeChild(textArea);
    return successful;
  };

  // 降级复制方法2: 使用input元素尝试复制
  const inputElementCopy = (text: string): boolean => {
    const input = document.createElement('input');
    input.value = text;
    
    // 优化移动端样式
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.style.fontSize = '16px'; // 防止iOS缩放
    input.style.width = '100%';
    input.style.left = '0';
    input.style.top = '0';
    
    document.body.appendChild(input);
    input.focus();
    input.select();
    
    let successful = false;
    try {
      successful = document.execCommand('copy');
    } catch (err) {
      console.error('input复制失败', err);
    }
    
    document.body.removeChild(input);
    return successful;
  };

  // 降级复制方法3: 选中内容提示用户手动复制
  const selectTextForManualCopy = (text: string) => {
    // 检测是否在微信内置浏览器中
    const isWechat = /MicroMessenger/i.test(navigator.userAgent);
    
    // 创建模态弹窗
    const textDisplay = document.createElement('div');
    textDisplay.style.position = 'fixed';
    textDisplay.style.top = '0';
    textDisplay.style.left = '0';
    textDisplay.style.right = '0';
    textDisplay.style.bottom = '0';
    textDisplay.style.backgroundColor = 'rgba(0,0,0,0.85)';
    textDisplay.style.zIndex = '10000';
    textDisplay.style.display = 'flex';
    textDisplay.style.flexDirection = 'column';
    textDisplay.style.alignItems = 'center';
    textDisplay.style.justifyContent = 'center';
    textDisplay.style.padding = '20px';
    
    // 创建内容容器
    const contentBox = document.createElement('div');
    contentBox.style.backgroundColor = 'white';
    contentBox.style.width = '90%';
    contentBox.style.maxWidth = '500px';
    contentBox.style.maxHeight = '80vh';
    contentBox.style.borderRadius = '12px';
    contentBox.style.padding = '20px';
    contentBox.style.overflowY = 'auto';
    contentBox.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)';
    contentBox.style.display = 'flex';
    contentBox.style.flexDirection = 'column';
    
    // 标题
    const title = document.createElement('h3');
    title.textContent = '文章内容 - 长按下方文本复制';
    title.style.textAlign = 'center';
    title.style.margin = '0 0 15px 0';
    title.style.color = '#1890ff';
    title.style.fontSize = '18px';
    title.style.fontWeight = 'bold';
    
    // 提示信息
    const instructions = document.createElement('div');
    const isSafari = /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
    
    if (isWechat) {
      instructions.innerHTML = '<div style="background-color:#f5f0ff; border-radius:8px; padding:12px; margin-bottom:15px;">' +
        '<span style="color:#722ed1; font-weight:bold;">微信浏览器提示：</span><br>' +
        '1. 长按下方蓝色区域<br>' +
        '2. 在弹出菜单中选择"复制"<br>' +
        '3. 粘贴到公众号编辑器中' +
        '</div>';
    } else if (isSafari) {
      instructions.innerHTML = '<div style="background-color:#f0f9ff; border-radius:8px; padding:12px; margin-bottom:15px;">' +
        '<span style="color:#1677ff; font-weight:bold;">iOS Safari提示：</span><br>' +
        '1. 点击下方蓝色区域<br>' +
        '2. 点击"全选"<br>' +
        '3. 点击"复制"<br>' +
        '4. 粘贴到公众号编辑器中' +
        '</div>';
    } else {
      instructions.innerHTML = '<div style="background-color:#f6ffed; border-radius:8px; padding:12px; margin-bottom:15px;">' +
        '<span style="color:#52c41a; font-weight:bold;">操作提示：</span><br>' +
        '1. 长按下方蓝色区域选择文本<br>' +
        '2. 点击"复制"<br>' +
        '3. 粘贴到公众号编辑器中' +
        '</div>';
    }
    
    instructions.style.fontSize = '14px';
    instructions.style.lineHeight = '1.6';
    instructions.style.marginBottom = '10px';
    
    // 文本区域
    const textContent = document.createElement('div');
    textContent.textContent = text;
    textContent.style.padding = '15px';
    textContent.style.backgroundColor = '#e6f7ff';
    textContent.style.borderRadius = '8px';
    textContent.style.fontSize = '14px';
    textContent.style.lineHeight = '1.6';
    textContent.style.color = '#333';
    textContent.style.border = '1px solid #91d5ff';
    textContent.style.whiteSpace = 'pre-wrap';
    textContent.style.wordBreak = 'break-word';
    textContent.style.userSelect = 'all'; // 使整个文本可选中
    // 使用dataset添加属性，绕过TypeScript检查
    (textContent as any).style['-webkit-user-select'] = 'all';
    (textContent as any).style['-moz-user-select'] = 'all';
    
    // 文本区域点击高亮
    textContent.addEventListener('click', function() {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textContent);
      selection?.removeAllRanges();
      selection?.addRange(range);
    });
    
    // 小贴士
    const tips = document.createElement('div');
    tips.innerHTML = '<div style="margin-top:15px; font-size:12px; color:#888; text-align:center; font-style:italic;">' +
      '💡 小贴士：如果复制不成功，可以尝试截图保存，然后使用图片识别文字功能' +
      '</div>';
    
    // 手动复制按钮
    const copyButton = document.createElement('button');
    copyButton.textContent = '尝试自动复制';
    copyButton.style.backgroundColor = '#1890ff';
    copyButton.style.color = 'white';
    copyButton.style.border = 'none';
    copyButton.style.borderRadius = '8px';
    copyButton.style.padding = '12px 16px';
    copyButton.style.margin = '20px 0 10px';
    copyButton.style.cursor = 'pointer';
    copyButton.style.fontSize = '16px';
    copyButton.style.width = '100%';
    copyButton.style.fontWeight = 'bold';
    
    copyButton.onclick = () => {
      // 尝试使用API复制
      const textToCopy = textContent.textContent || '';
      let success = false;
      
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              message.success('复制成功！');
              // 更新按钮状态
              copyButton.textContent = '✓ 复制成功';
              copyButton.style.backgroundColor = '#52c41a';
            })
            .catch(() => {
              const selection = window.getSelection();
              const range = document.createRange();
              range.selectNodeContents(textContent);
              selection?.removeAllRanges();
              selection?.addRange(range);
              
              if (document.execCommand('copy')) {
                message.success('复制成功！');
                copyButton.textContent = '✓ 复制成功';
                copyButton.style.backgroundColor = '#52c41a';
              } else {
                message.info('请长按文本手动复制');
                copyButton.textContent = '× 自动复制失败，请手动复制';
                copyButton.style.backgroundColor = '#ff4d4f';
              }
            });
        } else {
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(textContent);
          selection?.removeAllRanges();
          selection?.addRange(range);
          success = document.execCommand('copy');
          if (success) {
            message.success('复制成功！');
            copyButton.textContent = '✓ 复制成功';
            copyButton.style.backgroundColor = '#52c41a';
          } else {
            message.info('请长按文本手动复制');
            copyButton.textContent = '× 自动复制失败，请手动复制';
            copyButton.style.backgroundColor = '#ff4d4f';
          }
        }
      } catch (err) {
        console.error('复制按钮点击时出错', err);
        message.info('请长按文本手动复制');
        copyButton.textContent = '× 自动复制失败，请手动复制';
        copyButton.style.backgroundColor = '#ff4d4f';
      }
    };
    
    // 关闭按钮
    const closeButton = document.createElement('button');
    closeButton.textContent = '关闭';
    closeButton.style.backgroundColor = '#f5f5f5';
    closeButton.style.color = '#333';
    closeButton.style.border = '1px solid #d9d9d9';
    closeButton.style.borderRadius = '8px';
    closeButton.style.padding = '10px 16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '14px';
    closeButton.style.width = '100%';
    
    closeButton.onclick = () => {
      document.body.removeChild(textDisplay);
    };
    
    // 添加所有元素
    contentBox.appendChild(title);
    contentBox.appendChild(instructions);
    contentBox.appendChild(textContent);
    contentBox.appendChild(tips);
    contentBox.appendChild(copyButton);
    contentBox.appendChild(closeButton);
    textDisplay.appendChild(contentBox);
    
    document.body.appendChild(textDisplay);
    
    // 自动选中文本，便于用户直接复制
    try {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(textContent);
      selection?.removeAllRanges();
      selection?.addRange(range);
    } catch (e) {
      console.error('自动选中文本失败', e);
    }
  };

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

        // 在移动设备上，直接显示手动复制对话框，不尝试自动复制
        if (isMobile) {
          console.log('检测到移动设备，直接使用手动复制对话框');
          selectTextForManualCopy(formattedText);
          return;
        }

        // 仅在桌面设备上尝试自动复制
        // 尝试使用现代Clipboard API
        let copied = false;
        if (navigator.clipboard && window.isSecureContext) {
          try {
            await navigator.clipboard.writeText(formattedText);
            copied = true;
            message.success("文章内容已复制，可直接粘贴到公众号！");
            console.log('Clipboard API复制成功');
          } catch (err) {
            console.warn("Clipboard API 复制失败，将尝试降级方案", err);
          }
        }
        
        // 如果现代API失败，尝试降级方案1: execCommand
        if (!copied) {
          const execCommandSuccess = fallbackCopyTextToClipboard(formattedText);
          if (execCommandSuccess) {
            message.success("文章内容已复制，可直接粘贴到公众号！");
            copied = true;
            console.log('execCommand复制成功');
          } else {
            console.warn('execCommand复制失败，尝试input元素复制');
          }
        }
        
        // 如果execCommand失败，尝试降级方案2: input元素
        if (!copied) {
          const inputSuccess = inputElementCopy(formattedText);
          if (inputSuccess) {
            message.success("文章内容已复制，可直接粘贴到公众号！");
            copied = true;
            console.log('input元素复制成功');
          } else {
            console.warn('input元素复制失败，显示手动复制对话框');
          }
        }
        
        // 如果所有自动复制方法都失败，显示选择框让用户手动复制
        if (!copied) {
          message.warning("自动复制功能受限，请使用手动复制");
          selectTextForManualCopy(formattedText);
        }
      } catch (err) {
        console.error("复制过程中发生错误", err);
        message.error("复制失败，请尝试手动复制");
        // 最终降级方案
        if (articleRef.current?.textContent) {
          selectTextForManualCopy(content);
        }
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