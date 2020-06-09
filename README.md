## dev server
```shell
gulp
```
## build
```shell
gulp build
```
#### Опции
```shell
--prod
```
#### Алиасы
```shell
'~common': ./src/common,
'~components': ./src/components,
'~vendor': ./src/vendor,
'~images': ./build/images,
'~static': ./src/static,
```
##### import '~common/blocks/my-block';
##### @import "~common/styles/mixins/media";
##### background-image: url("~images/loader.svg");
##### extend ~common/templates/layout/page.pug
