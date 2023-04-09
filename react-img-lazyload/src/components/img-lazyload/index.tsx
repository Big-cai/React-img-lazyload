import React,{ useEffect } from "react";
import "./index.css";
import icon from "./image/default.png";
import { log } from "console";

const Lazyload = (props) => {


    // 节流函数
    const throttle = (fn,time) => {
        let flag = false

        return (...args) => {
            if(flag) return
            fn.call(undefined,...args)
            flag = true

            setTimeout(()=>{
                flag = false
            },time)

        }
    }

    const lazyload = () => {
        // 获取可视区高度
        const viewHeight = document.body.clientHeight
        
        const imgs = document.querySelectorAll('img[data-src')

        imgs.forEach((item,index) => {

            if((item as HTMLElement).dataset.src  === '') return

            // 获取页面中某个元素的，左上右下，和分别相对浏览器视窗的位置
            let rect = item.getBoundingClientRect()
            console.log(rect.bottom,'rect.bottom');
            console.log(rect.top,'rect.top');
            console.log(viewHeight,'viewHeight');
            
            if(rect.bottom >= 0 && rect.top < viewHeight) {
                (item as any).src = (item as HTMLElement).dataset.src
                item.removeAttribute('data-src')
            }
        })
    }


    useEffect(()=>{
        throttle(lazyload,200)
        window.addEventListener('scroll',throttle(lazyload,200))
        return ()=> {
            window.removeEventListener('scroll',throttle(lazyload,200))
        }
    },[])


    return(
        <>
        {Array(100).fill(0).map((_,i) => i + 1).map((item,index)=>{
            return (
                <img key={index} src={icon} data-src={props.src} alt="" className="lazyImg"/>
            )
        })}
        </>
    )
}

export default Lazyload;