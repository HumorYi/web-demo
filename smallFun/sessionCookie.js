//【总结】清除webbrowser cookie/session的6种方法
//下面是我测试下来的6种清除webbrowser中cookie的6种方法：

            //方法一：调用 wininet.dll清除cookie (推荐)
            SuppressWininetBehavior();

            //方法二：删除用户登录后的信息,这里相当于浏览器的注销功能,使用的是ie自带的功能 (推荐)
            HtmlDocument document = wb.Document;
            document.ExecCommand("ClearAuthenticationCache", false, null);

            //方法三：删除本机cookie 此方法会弹出ie清除cookie的弹出框
            //Temporary Internet Files  （Internet临时文件）
            //RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 8
            //Cookies
            //RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 2
            //History (历史记录)
            //RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 1
            //Form. Data （表单数据）
            //RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 16
            //Passwords (密码）
            //RunDll32.exe InetCpl.cpl,ClearMyTracksByProcess 32
            //Delete All  （全部删除）
            //ShellExecute(IntPtr.Zero, "open", "rundll32.exe", " InetCpl.cpl,ClearMyTracksByProcess 2", "", ShowCommands.SW_HIDE);
            ShellExecute(IntPtr.Zero, "open", "rundll32.exe", " InetCpl.cpl,ClearMyTracksByProcess 255", "", ShowCommands.SW_HIDE);


            //方法四:使用webbrowser自带的清coookie的方法 (不推荐，清不掉session，实测无效)
            wb.Document.Cookie.Remove(0, (wb.Document.Cookie.Count() - 1));

            //方法五：使用js清除cookie (不推荐，清不掉session)
            wb.Navigate("javascript:void((function(){var a,b,c,e,f;f=0;a=document.cookie.split('; ');for(e=0;e<a.length&&a[e];e++){f++;for(b='.'+location.host;b;b=b.replace(/^(?:%5C.|[^%5C.]+)/,'')){for(c=location.pathname;c;c=c.replace(/.$/,'')){document.cookie=(a[e]+'; domain='+b+'; path='+c+'; expires='+new Date((new Date()).getTime()-1e11).toGMTString());}}}})())");
            //var a,b,c,e,f;
            //f=0;
            //a=document.cookie.split('; ');
            //b='.'+'baidu.com';
            ////b='.'+'www.baidu.com';
            //for(e=0;e<a.length;e++){
            //    //b='.'+location.host;
            //    b=b.replace(/^(?:%5C.|[^%5C.]+)/,'');
            //    c=location.pathname;
            //    c=c.replace(/.$/,'');
            //    ck = a[e]+'; domain='+b+'; path='+c+'; expires='+new Date((new Date()).getTime()-1e11).toGMTString();
            //    console.log(ck);
            //    document.cookie=ck;
            //}

            //方法六：使用InternetSetCookie给cookie赋null值 (不推荐)
            //也可以给此Cookie赋空值:InternetSetCookie
            //InternetSetCookie("http://.qq.com/", NULL, "uin=; PATH=/; DOMAIN=qq.com");
