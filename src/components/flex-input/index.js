import React, { useState, useRef } from 'react';
import './index.css'
export function FlexInput(props) {

  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);
  const hiddenRef = useRef(null);
  const [height, setHeight] = useState(24); // 初始高度
  const [value, setValue] = useState(''); // textarea的内容
  const [wrap, setWrap] = useState('off'); // 隐藏textarea是否换行

  const placeholder = props.placeholder || '请输入';
  const disabled = props.disabled || false;
  const onChange = props.onChange || function(){}
  const handleKeyUp = (event) => {
    const containerWidth = inputContainerRef.current.clientWidth;
    setValue(event.target.value);
    const content = hiddenRef.current;
    const contentWidth = document.getElementById('hidden').scrollWidth; // 内容宽度
    const contentHeight = document.getElementById('hidden').scrollHeight; // 内容高度
    inputRef.current.style.height = `${contentHeight}px`
    inputContainerRef.current.style.height = `${contentHeight + 20}px`
    setHeight(contentHeight)

    if(contentWidth > 150 && contentWidth < containerWidth-30) {
      inputRef.current.style.width = `${contentWidth+20}px`;
    }
    if(contentWidth > containerWidth) {
      inputRef.current.style.width = `${containerWidth-30}px`
      inputRef.current.style.height = `${height+24}px`;
      inputContainerRef.current.style.height = `${height +50}px`;
      setHeight(height+24);
      content.style.width = `${containerWidth-30}px`
      setWrap('soft');
    }
    // 如果用户点击enter键，换行
    if(event?.keyCode === 13) {
      // 切换父级元素高度
      inputRef.current.style.height = `${height+24}px`;
      setHeight(height + 24);  
      inputContainerRef.current.style.height = `${height+50}px`;
    }
  }
  return (
    <div className='input-wrapper' ref={inputContainerRef}>
      {/* 为了计算内容的宽度和高度 */}
      <textarea className='hidden-textarea'
        value={value}
        ref={hiddenRef}
        wrap={wrap}
        id="hidden"
      ></textarea>
      <textarea 
        ref={inputRef}
        placeholder={placeholder}
        disabled={disabled}
        onKeyUp={handleKeyUp}
        className='input-area'
        onChange={onChange}
        >
      </textarea>
    </div>
  )
}

// FlexInput component

// 当用户输入数据时，判断输入字符串的高度和宽度
// 当内容宽度大于当前textarea宽度时，判断textarea宽度是否小于容器宽度，如果小于，增加textarea宽度，如果大于等于，就自动换行
// 当用户输入回车换行时，增加textarea高度，增加的高度为line-height的高度：24。
// 当用户删除元素时，即delete键时，根据内容的宽高来缩减textarea宽高。