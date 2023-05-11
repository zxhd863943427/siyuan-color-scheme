[中文](https://github.com/siyuan-note/plugin-sample/blob/main/README_zh_CN.md)

# SiYuan plugin sample

## Get started

* Make a copy of this repo as a template with the <kbd>Use this template</kbd> button, please note that the repo name
  must be the same as the plugin name
* Clone your repo to a local development folder. For convenience, you can place this folder in
  your `{workspace}/data/plugins/` folder
* Install [NodeJS](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation), then run `pnpm i` in the
  command line under your repo folder
* Execute `pnpm run dev` for real-time compilation
* Open SiYuan marketplace and enable plugin in downloaded tab

## Development

* plugin.json
* icon.png (160*160)
* preview.png (1024*768)
* src/*
* README*.md
* [Fontend API](https://github.com/siyuan-note/petal)
* [Backend API](https://github.com/siyuan-note/siyuan/blob/master/API.md)

## I18n

In terms of internationalization, our main consideration is to support multiple languages. Specifically, we need to
complete the following tasks:

* Meta information about the plugin itself, such as plugin description and readme
    * `description` and `readme` fields in plugin.json, and the corresponding README*.md file
* Text used in the plugin, such as button text and tooltips
    * src/i18n/*.json language configuration files
    * Use `this.i18.key` to get the text in the code
* Finally, declare the language supported by the plugin in the `i18n` field in plugin.json

It is recommended that the plugin supports at least English and Simplified Chinese, so that more people can use it more
conveniently.

## plugin.json

```json
{
  "name": "plugin-sample",
  "author": "Vanessa",
  "url": "https://github.com/siyuan-note/plugin-sample",
  "version": "0.0.1",
  "displayName": {
    "default": "Plugin Sample",
    "zh_CN": "插件示例"
  },
  "description": {
    "default": "This is a plugin sample",
    "zh_CN": "这是一个插件示例"
  },
  "readme": {
    "default": "README.md",
    "zh_CN": "README_zh_CN.md"
  },
  "i18n": [
    "en_US",
    "zh_CN"
  ],
  "funding": {
    "openCollective": "b3log",
    "patreon": "",
    "github": "",
    "custom": [
      "https://ld246.com/sponsor"
    ]
  }
}
```

* `name`: Plugin name, must be the same as the repo name, and must be unique globally (no duplicate plugin names in the
  marketplace)
* `author`: Plugin author name
* `url`: Plugin repo URL
* `version`: Plugin version number, it is recommended to follow the [semver](https://semver.org/) specification
* `displayName`: Template display name, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `description`: Plugin description, mainly used for display in the marketplace list, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `readme`: readme file name, mainly used to display in the marketplace details page, supports multiple languages
    * `default`: Default language, must exist
    * `zh_CN`, `en_US` and other languages: optional, it is recommended to provide at least Chinese and English
* `i18n`: Plugin supported language list
* `funding`: Plugin sponsorship information
    * `openCollective`: Open Collective name
    * `patreon`: Patreon name
    * `github`: GitHub login name
    * `custom`: Custom sponsorship link list

## Package

No matter which method is used to compile and package, we finally need to generate a package.zip, which contains at
least the following files:

* icon.png
* index.js
* plugin.json
* preview.png
* README*.md
* index.css (optional)
* i18n/* (optional)

## List on the marketplace

* `pnpm run build` to generate package.zip
* Create a new GitHub release using your new version number as the "Tag version". See here for an
  example: https://github.com/siyuan-note/plugin-sample/releases
* Upload the file package.zip as binary attachments
* Publish the release

If it is the first release, please create a pull request to
the [Community Bazaar](https://github.com/siyuan-note/bazaar) repository and modify the plugins.json file in it. This
file is the index of all community plugin repositories, the format is:

```json
{
  "repos": [
    "username/reponame"
  ]
}
```

After the PR is merged, the bazaar will automatically update the index and deploy through GitHub Actions. When releasing
a new version of the plugin in the future, you only need to follow the above steps to create a new release, and you
don't need to PR the community bazaar repo.

Under normal circumstances, the community bazaar repo will automatically update the index and deploy every hour,
and you can check the deployment status at https://github.com/siyuan-note/bazaar/actions.
