 /***********************************************************
 UrlBuilder Class created by JavaScript

 Author: lizhi[at]hit.edu.cn
 Version: 1.0
 Created: 2006.02.21 22:05
 Updated: N/A

 History:
     1. The first version of code created in 2006.02.21 
***********************************************************/
function UrlBuilder(url)
{
    this.m_Href = null;
    this.m_Host = null;
    this.m_Hostname = null; 
    this.m_Port = null;
    this.m_Protocol = null;
    this.m_Path = null;
    this.m_Search = null;
    this.m_Hash = null;
    this.m_Params = null; 
    this.m_Sucess = false; 
    if ( url ) this.Parse(url);
   
    this.toString = function()
    {
         return '[class UrlBuilder]';
    };     
}

UrlBuilder.prototype.Parse = function(url)
{
    var m = url.match(/(\w{3,5}:)\/\/([^\.]+(?:\.[^\.:/]+)+)(?::(\d{1,5}))?\/?/);
    if ( m )
    {
         this.m_Protocol = m[1];
         this.m_Hostname = m[2]; 
         this.m_Port = m[3]; 
         if ( this.m_Port ) 
         {
             this.m_Host = this.m_Hostname + ':' + this.m_Port;
         }
         else
         {  
             this.m_Host = m[2];
         }
         var indexHash = url.indexOf('#');
         if ( indexHash != -1 )
         {
             this.m_Hash = url.substr(indexHash);
         }
         else
         {
             this.m_Hash = '';
         }        
         var indexParams = url.indexOf('?');
         if ( indexParams != -1 )
         {
             if ( indexHash != -1 )
             {
                  this.m_Search = url.substring(indexParams, indexHash);
             }
             else
             { 
                  this.m_Search = url.substr(indexParams);
             }
             this.m_Path = url.substr(indexParams);
         }
         else
         {
             this.m_Search = '';
         }
         this.m_Success = true; 
         this.m_Params = null; 
         this.m_Href = url;
    }
};

UrlBuilder.prototype.GetValue = function(key, encoding)
{
    if ( !this.m_Params )
    {
         if ( this.m_Search )
         {
             this.m_Params = {}; 
             var search = this.m_Search.substring(1);
             var keyValues = search.split('&');
             for ( var i=0 ; i < keyValues.length ; ++i )
             {
                  var keyValue = keyValues[i];
                  var index = keyValue.indexOf('=');
                  if ( index != -1 )
                  {
                       this.m_Params[keyValue.substring(0, index)] = keyValue.substr(index+1);
                  }
                  else
                  {
                       this.m_Params[keyValue] = '';
                  }
              }  
         }
    }
    encoding = encoding || ''; 
    switch(encoding.toUpperCase())
    {
         case 'UTF8' :
         {
              return decodeURI(this.m_Params[key]);
         }
         case 'UNICODE' :
         {
              return unescape(this.m_Params[key]);
         }
         case 'GB2312' : // need VBScript function Chr()
         default :
         {
              return this.m_Params[key];
         }
    }  
}
