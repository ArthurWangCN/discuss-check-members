# 使用说明
当前目录下运行npm install & npm run build
然后在dist目录下运行index.html进行验证，如果没有有问题，则可以使用check-members.min.js
## 组件使用说明文档路径
 文档：选人组件使用说明.md
 链接：http://note.youdao.com/noteshare?id=724fa1288ccf9ebcf3350a60bdeff30f&sub=411F3C4DF2C64A09B9B02D737E21AD00
### 组件路径
> OKMS\项目源码\OKMS.Check-Members-New\dist\check-members.min.js

### 参数说明
##### 根据需求，根据项目环境，请求正确的接口，传正确的参数

+ is-multi-level
  > 多层级数据传true,单层级数据传false,其他参数不变
+ language
  > 用于国际化，'en'||'zh'||'zh-cn'

#### 检索机构成员和群组成员，数据结构是两级,传参方式如下（镜像）

```
//镜像环境，请求机构成员和群组成员
// html
<CheckMembers ref="members"
            :props="defaultProps"
            :empty-text="emptyText"
            :radio="radio"
            :expanded="expanded"
            :title="title"
            @confirm="confirm"
            :disabled-list="disabledList"
            :max-length="100"
            :forward="forward"
            @overflow="overflow"
            :append-to-body='true'
            :madal='false'
            :language='language'
            :is-multi-level="true"/> 
---------------------------------------------------------------------------------
// js
this.organization: [
    { name: i18n.t('message.orgMember'), //机构成员
        data: [], 
        expanded: false , 
        isTree: true, 
        
    },
    { name:i18n.t('message.group'),  //群组成员
        data: [] 
        expanded: false, 
        isTree: false, 
    }
],
this.$refs.members.show({ list: this.organization, members: selectedMember });
    
```

![数据多层级](A2E60463AE09469193C40BF6151A973A)

#### 检索团队成员（汇智）

```
//汇智项目中，请求团队成员
// html
<CheckMembers ref="members"
            :props="defaultProps"
            :empty-text="emptyText"
            :radio="radio"
            :expanded="expanded"
            :title="title"
            @confirm="confirm"
            :disabled-list="disabledList"
            :max-length="100"
            :forward="forward"
            @overflow="overflow"
            :append-to-body='true'
            :madal='false'
            :language='language'             
            :is-multi-level="false"/> 
------------------------------------------------------------------------------
// js
this.organization: [{   
        name:i18n.t('message.group'), //团队成员
        data:[],
        expanded: false, 
        isTree: false, 
}],
this.$refs.members.show({ list: this.organization, members: selectedMember });
    
```
![一级结构数据](F3005C351FC24A17B69DEA2F3F5752B1)

