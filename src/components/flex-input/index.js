import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import './index.css'
export function FlexInput(props) {

  const inputContainerRef = useRef(null);
  const inputRef = useRef(null);
  const hiddenRef = useRef(null);
  const [height, setHeight] = useState(28); // 初始高度
  const [value, setValue] = useState(''); // textarea的内容
  const [wrap, setWrap] = useState('off'); // 隐藏textarea是否换行

  const placeholder = props.placeholder || '请输入';
  const disabled = props.disabled || false;
  const onChange = props.onChange || function(){};

  useLayoutEffect(() => {
    const containerWidth = inputContainerRef.current.offsetWidth;
    const content = hiddenRef.current;
    inputRef.current.style.height = `${content.scrollHeight}px`;
    inputContainerRef.current.style.height = `${content.scrollHeight}px`;
    // 内容在区间范围内变宽，输入框跟着变化
    if(content.scrollWidth > 180 && content.scrollWidth <= containerWidth-32) {
      inputRef.current.style.width = `${content.scrollWidth}px`;
    }
    if(content.scrollWidth > containerWidth - 40) {
      // 超出一行后，固定隐藏区的宽度，使之能换行
      content.style.width = `${containerWidth - 30}px`;
      setWrap('soft');
      inputRef.current.style.height = `${content.scrollHeight}px`;
      inputContainerRef.current.style.height = `${content.scrollHeight}px`;
      setHeight(content.scrollHeight);
    }
  }, [value])

  const handleKeyUp = (event) => {
    setValue(event.target.value);
    if(event.keyCode === 13) {
      // 点击了enter键
      inputRef.current.style.height = `${height + 24}px`;
      inputContainerRef.current.style.height = `${height + 24}px`;
      setHeight(height + 24);
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
        wrap={wrap}
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