"use strict";(self.webpackChunkcf_infra_docs=self.webpackChunkcf_infra_docs||[]).push([[3145],{17227:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>d,toc:()=>c});var l=i(85893),s=i(11151);const a={title:"Configuring conda-forge.yml"},r="Configuring conda-forge.yml",d={id:"maintainer/conda_forge_yml",title:"Configuring conda-forge.yml",description:"You can configure how conda-forge is set up and built via the conda-forge.yml",source:"@site/docs/maintainer/conda_forge_yml.md",sourceDirName:"maintainer",slug:"/maintainer/conda_forge_yml",permalink:"/docs/maintainer/conda_forge_yml",draft:!1,unlisted:!1,editUrl:"https://github.com/conda-forge/conda-forge.github.io/tree/refs/heads/main/docs/maintainer/conda_forge_yml.md",tags:[],version:"current",lastUpdatedAt:1709138077,formattedLastUpdatedAt:"Feb 28, 2024",frontMatter:{title:"Configuring conda-forge.yml"},sidebar:"docs",previous:{title:"Pinned dependencies",permalink:"/docs/maintainer/pinning_deps"},next:{title:"Knowledge Base",permalink:"/docs/maintainer/knowledge_base"}},o={},c=[{value:"Top-level fields",id:"top-level-fields",level:2},{value:"appveyor",id:"appveyor",level:3},{value:"azure",id:"azure",level:3},{value:"bot",id:"bot",level:3},{value:"build_platform",id:"build_platform",level:3},{value:"build_with_mambabuild",id:"build_with_mambabuild",level:3},{value:"channel_priority",id:"channel_priority",level:3},{value:"channels",id:"channels",level:3},{value:"choco",id:"choco",level:3},{value:"circle",id:"circle",level:3},{value:"conda_build",id:"conda_build",level:3},{value:"conda_build_tool",id:"conda_build_tool",level:3},{value:"conda_forge_output_validation",id:"conda_forge_output_validation",level:3},{value:"conda_install_tool",id:"conda_install_tool",level:3},{value:"conda_solver",id:"conda_solver",level:3},{value:"docker",id:"docker",level:3},{value:"github",id:"github",level:3},{value:"github_actions",id:"github_actions",level:3},{value:"idle_timeout_minutes",id:"idle_timeout_minutes",level:3},{value:"linux",id:"linux",level:3},{value:"linux_aarch64",id:"linux_aarch64",level:3},{value:"linux_ppc64le",id:"linux_ppc64le",level:3},{value:"noarch_platforms",id:"noarch_platforms",level:3},{value:"os_version",id:"os_version",level:3},{value:"osx",id:"osx",level:3},{value:"provider",id:"provider",level:3},{value:"recipe_dir",id:"recipe_dir",level:3},{value:"remote_ci_setup",id:"remote_ci_setup",level:3},{value:"shellcheck",id:"shellcheck",level:3},{value:"skip_render",id:"skip_render",level:3},{value:"templates",id:"templates",level:3},{value:"test_on_native_only",id:"test_on_native_only",level:3},{value:"test",id:"test",level:3},{value:"travis",id:"travis",level:3},{value:"upload_on_branch",id:"upload_on_branch",level:3},{value:"win",id:"win",level:3}];function t(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"configuring-conda-forge-yml"})}),"\n",(0,l.jsx)(n.h1,{id:"configuring-conda-forgeyml",children:"Configuring conda-forge.yml"}),"\n",(0,l.jsxs)(n.p,{children:["You can configure how conda-forge is set up and built via the ",(0,l.jsx)(n.code,{children:"conda-forge.yml"}),"\nfile that is present in the root directory of a feedstock."]}),"\n",(0,l.jsxs)(n.p,{children:["Rerendering the feedstock after you modify this file is usually required and always a good idea (see ",(0,l.jsx)(n.a,{href:"/docs/maintainer/updating_pkgs#dev-update-rerender",children:"Rerendering feedstocks"}),")."]}),"\n",(0,l.jsxs)(n.p,{children:["The next section describes in detail the top-level fields in  ",(0,l.jsx)(n.code,{children:"conda-forge.yml"}),"."]}),"\n",(0,l.jsxs)(n.p,{children:["Note that each top-level CI provider field supports the ",(0,l.jsx)(n.code,{children:"upload_packages"})," option.\nWhen set to False this will override the default behaviour of attempting to\nupload packages to anaconda.org, which can be useful for testing. For example:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"azure:\n  upload_packages: False\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"top-level-fields"})}),"\n",(0,l.jsx)(n.h2,{id:"top-level-fields",children:"Top-level fields"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#appveyor",children:"appveyor"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#azure-config",children:"azure"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#build-platform",children:"build_platform"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#build-with-mambabuild",children:"build_with_mambabuild"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#bot",children:"bot"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#channel-priority",children:"channel_priority"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#channels",children:"channels"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#choco",children:"choco"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#circle",children:"circle"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#conda-build",children:"conda_build"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#conda-build-tool",children:"conda_build_tool"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#conda-forge-output-validation",children:"conda_forge_output_validation"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#conda-install-tool",children:"conda_install_tool"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#conda-solver",children:"conda_solver"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#docker",children:"docker"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#github",children:"github"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#github-actions",children:"github_actions"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#idle-timeout-minutes",children:"idle_timeout_minutes"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#linux",children:"linux"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#linux-aarch64",children:"linux_aarch64"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#linux-ppc64le",children:"linux_ppc64le"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#noarch-platforms",children:"noarch_platforms"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#os-version",children:"os_version"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#osx",children:"osx"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#provider",children:"provider"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#recipe-dir",children:"recipe_dir"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#remote-ci-setup",children:"remote_ci_setup"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#shellcheck",children:"shellcheck"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#skip-render",children:"skip_render"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#templates",children:"templates"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#test-on-native-only",children:"test_on_native_only"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#test",children:"test"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#travis",children:"travis"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#upload-on-branch",children:"upload_on_branch"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"#win",children:"win"})}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"appveyor"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id1"})}),"\n",(0,l.jsx)(n.h3,{id:"appveyor",children:"appveyor"}),"\n",(0,l.jsxs)(n.p,{children:["The top-level ",(0,l.jsx)(n.code,{children:"appveyor"})," key specifies configurations for the Appveyor\nCI service.  This is usually ",(0,l.jsx)(n.strong,{children:"read-only"})," and should not normally be manually\nmodified. Tools like conda-smithy may modify this, as needed."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"azure-config"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"azure"})}),"\n",(0,l.jsx)(n.h3,{id:"azure",children:"azure"}),"\n",(0,l.jsx)(n.p,{children:"This dictates the behavior of the Azure Pipelines CI service. It is a\nmapping for Azure-specific configuration options. For example:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"azure:\n  # flag for forcing the building all supported providers\n  force: False\n  # toggle for storing the conda build_artifacts directory (including the\n  # built packages) as an Azure pipeline artifact that can be downloaded\n  store_build_artifacts: False\n  # toggle for freeing up some extra space on the default Azure Pipelines\n  # linux image before running the Docker container for building\n  free_disk_space: False\n  # limit the amount of CI jobs running concurrently at a given time\n  # each OS will get its proportional share of the configured value\n  max_parallel: 25\n  # set the timeoutInMinutes field for jobs in the azure pipeline.\n  # jobs that take longer than this will be cancelled.\n  # default: 360 (6 hours)\n  timeout_minutes: 360\n  # can also be set per-platform via\n  # settings_linux:\n  #   timeoutInMinutes: 360\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"self-hosted-azure-config"})}),"\n",(0,l.jsx)(n.p,{children:"Below is an example configuration for setting up a self-hosted Azure agent for Linux:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"azure:\n  settings_linux:\n    pool:\n      name: your_local_pool_name\n      demands:\n        - some_key -equals some_value\n    workspace:\n      clean: all\n    strategy:\n      maxParallel: 1\n    timeoutInMinutes: 360\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"azure-swapfile"})}),"\n",(0,l.jsx)(n.p,{children:"Below is an example configuration for adding a swapfile on an Azure agent for Linux:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"azure:\n  settings_linux:\n    swapfile_size: 10GiB\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"azure-pagefile"})}),"\n",(0,l.jsx)(n.p,{children:"To increase the pagefile size on Windows, use this block:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"azure:\n  settings_win:\n    variables:\n      SET_PAGEFILE: 'True'\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"bot"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id2"})}),"\n",(0,l.jsx)(n.h3,{id:"bot",children:"bot"}),"\n",(0,l.jsxs)(n.p,{children:["This field controls the behavior of the ",(0,l.jsx)(n.code,{children:"auto-tick"})," bot which issues\nautomatic version updates/migrations for feedstocks. The current options are"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"bot:\n  # can the bot automerge PRs it makes on this feedstock\n  automerge: true\n  # only automerge on successful version PRs, migrations are not automerged\n  automerge: 'version'\n  # only automerge on successful migration PRs, versions are not automerged\n  automerge: 'migration'\n\n  # only open PRs if resulting environment is solvable, useful for tightly coupled packages\n  check_solvable: true\n\n  # The bot.inspection key in the conda-forge.yml can have one of six possible values:\n  inspection: hint  # generate hints using source code (backwards compatible)\n  inspection: hint-all  # generate hints using all methods\n  inspection: hint-source  # generate hints using only source code\n  inspection: hint-grayskull  # generate hints using only grayskull\n  inspection: update-all  # update recipe using all methods\n  inspection: update-source  # update recipe using only source code\n  inspection: update-grayskull  # update recipe using only grayskull\n\n  # any branches listed in this section will get bot migration PRs in addition\n  # to the default branch\n  abi_migration_branches:\n    - v1.10.x\n\n  version_updates:\n    # use this for packages that are updated too frequently\n    random_fraction_to_keep: 0.1  # keeps 10% of versions at random\n"})}),"\n",(0,l.jsxs)(n.p,{children:["The ",(0,l.jsx)(n.code,{children:"abi_migration_branches"})," feature is useful to, for example, add a\nlong-term support (LTS) branch for a package."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"build-platform"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id3"})}),"\n",(0,l.jsx)(n.h3,{id:"build_platform",children:"build_platform"}),"\n",(0,l.jsxs)(n.p,{children:["This is a mapping from the target platform to the build platform for the package\nto be built. e.g. the following builds a ",(0,l.jsx)(n.code,{children:"osx-64"})," package on the ",(0,l.jsx)(n.code,{children:"linux-64"}),"\nbuild platform using cross-compiling."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"build_platform:\n  osx_64: linux_64\n"})}),"\n",(0,l.jsx)(n.p,{children:"Leaving this field empty implicitly requests to build a package natively. i.e."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"build_platform:\n  linux_64: linux_64\n  linux_ppc64le: linux_ppc64le\n  linux_aarch64: linux_aarch64\n  osx_64: osx_64\n  osx_arm64: osx_arm64\n  win_64: win_64\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"build-with-mambabuild"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id4"})}),"\n",(0,l.jsx)(n.h3,{id:"build_with_mambabuild",children:"build_with_mambabuild"}),"\n",(0,l.jsx)(n.admonition,{type:"warning",children:(0,l.jsxs)(n.p,{children:["This option has been deprecated. See ",(0,l.jsx)(n.a,{href:"#conda-build-tool",children:"conda_build_tool"})," for more information."]})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"channel-priority"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id5"})}),"\n",(0,l.jsx)(n.h3,{id:"channel_priority",children:"channel_priority"}),"\n",(0,l.jsxs)(n.p,{children:["This value sets the ",(0,l.jsx)(n.code,{children:"conda"})," solver channel priority for feedstock builds.\nThe default is ",(0,l.jsx)(n.code,{children:"strict"}),". Any valid value for the same setting in the ",(0,l.jsx)(n.code,{children:".condarc"})," is\nallowed here."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"channels"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id6"})}),"\n",(0,l.jsx)(n.h3,{id:"channels",children:"channels"}),"\n",(0,l.jsxs)(n.admonition,{type:"warning",children:[(0,l.jsxs)(n.p,{children:["This parameter has been deprecated. Instead, specify channels in ",(0,l.jsx)(n.code,{children:"recipe/conda_build_config.yaml"}),"\nusing ",(0,l.jsx)(n.code,{children:"channel_sources"})," and ",(0,l.jsx)(n.code,{children:"channel_targets"}),". Note that all channels go on a single\nline because each line represents a build variant."]}),(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",metastring:'title="recipe/conda_build_config.yaml"',children:"channel_sources:\n  - mysourcechannel1,mysourcechannel2,conda-forge,defaults\nchannel_targets:\n  - target_channel target_label\n"})})]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"choco"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id7"})}),"\n",(0,l.jsx)(n.h3,{id:"choco",children:"choco"}),"\n",(0,l.jsx)(n.p,{children:"This parameter allows for conda-smithy to run chocoloatey installs on Windows\nwhen additional system packages are needed. This is a list of strings that\nrepresent package names and any additional parameters. For example,"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"choco:\n  # install a package\n  - nvidia-display-driver\n\n  # install a package with a specific version\n  - cuda --version=11.0.3\n"})}),"\n",(0,l.jsxs)(n.p,{children:["This is currently only implemented for Azure Pipelines. The command that is run is\n",(0,l.jsx)(n.code,{children:"choco install {entry} -fdv -y --debug"}),".  That is, ",(0,l.jsx)(n.code,{children:"choco install"})," is executed\nwith a standard set of additional flags that are useful on CI."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"circle"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id8"})}),"\n",(0,l.jsx)(n.h3,{id:"circle",children:"circle"}),"\n",(0,l.jsxs)(n.p,{children:["The top-level ",(0,l.jsx)(n.code,{children:"circle"})," key specifies configurations for the Circle\nCI service.  This is usually ",(0,l.jsx)(n.strong,{children:"read-only"})," and should not normally be manually\nmodified.  Tools like conda-smithy may modify this, as needed."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"conda-build"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id9"})}),"\n",(0,l.jsx)(n.h3,{id:"conda_build",children:"conda_build"}),"\n",(0,l.jsx)(n.p,{children:"Settings in this block are used to control how conda build runs and produces\nartifacts. The currently supported options are"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"conda_build:\n  pkg_format: 2    # makes .conda artifacts\n  pkg_format: None # makes .tar.bz2 artifacts\n  # controls the compression level for .conda artifacts\n  # conda-forge uses a default value of 16 since its artifacts\n  # can be large. conda-build has a default of 22.\n  zstd_compression_level: 16\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"conda-build-tool"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id10"})}),"\n",(0,l.jsx)(n.h3,{id:"conda_build_tool",children:"conda_build_tool"}),"\n",(0,l.jsx)(n.p,{children:"Use this option to choose which tool is used to build your recipe. Currently allowed options are:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"conda-build"}),": Vanilla ",(0,l.jsx)(n.code,{children:"conda build ..."})," with no explicit solver configuration. Note that it will still respect the value configured in ",(0,l.jsx)(n.a,{href:"#conda-solver",children:"conda_solver"}),", if any."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"conda-build+classic"}),": ",(0,l.jsx)(n.code,{children:"conda build ..."})," with the ",(0,l.jsx)(n.code,{children:"classic"})," solver enforced."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"conda-build+conda-libmamba-solver"}),": ",(0,l.jsx)(n.code,{children:"conda build ..."})," with the ",(0,l.jsx)(n.code,{children:"conda-libmamba-solver"})," solver enforced."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"mambabuild"}),": ",(0,l.jsx)(n.code,{children:"conda mambabuild ..."})," as provided by ",(0,l.jsx)(n.code,{children:"boa"}),"."]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"conda-forge-output-validation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id11"})}),"\n",(0,l.jsx)(n.h3,{id:"conda_forge_output_validation",children:"conda_forge_output_validation"}),"\n",(0,l.jsxs)(n.p,{children:["This field must be set to ",(0,l.jsx)(n.code,{children:"True"})," for feedstocks in the ",(0,l.jsx)(n.code,{children:"conda-forge"})," GitHub\norganization. It enables the required feedstock artifact validation as described\nin ",(0,l.jsx)(n.a,{href:"/docs/maintainer/infrastructure#output-validation",children:"Output Validation and Feedstock Tokens"}),"."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"conda-install-tool"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id12"})}),"\n",(0,l.jsx)(n.h3,{id:"conda_install_tool",children:"conda_install_tool"}),"\n",(0,l.jsx)(n.p,{children:"Use this option to choose which tool is used to provision the tooling in your feedstock.\nCurrently allowed options are:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"conda"}),": ",(0,l.jsx)(n.code,{children:"conda install ..."}),". You can change which solver to use via ",(0,l.jsx)(n.a,{href:"#conda-solver",children:"conda_solver"}),"."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"mamba"}),": ",(0,l.jsx)(n.code,{children:"mamba install ..."})," as provided by the ",(0,l.jsx)(n.a,{href:"https://github.com/mamba-org/mamba",children:"mamba project"}),". ",(0,l.jsx)(n.code,{children:"conda_solver"})," has no effect here."]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"conda-solver"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id13"})}),"\n",(0,l.jsx)(n.h3,{id:"conda_solver",children:"conda_solver"}),"\n",(0,l.jsxs)(n.p,{children:["Choose which ",(0,l.jsx)(n.code,{children:"conda"})," solver plugin to use for feedstock builds.\nNote this configuration might affect ",(0,l.jsx)(n.a,{href:"#conda-build-tool",children:"conda_build_tool"})," (e.g. when set to ",(0,l.jsx)(n.code,{children:"conda-build"}),")\nand ",(0,l.jsx)(n.a,{href:"#conda-install-tool",children:"conda_install_tool"})," (e.g. when set to ",(0,l.jsx)(n.code,{children:"conda"}),")."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"docker"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id14"})}),"\n",(0,l.jsx)(n.h3,{id:"docker",children:"docker"}),"\n",(0,l.jsx)(n.p,{children:"This is a mapping to docker configuration options. These are relatively\nself-explanatory. The defaults are as follows:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:'docker:\n  executable: docker\n  image: "condaforge/linux-anvil-comp7"\n  command: "bash"\n  interactive: True\n'})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"github"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id15"})}),"\n",(0,l.jsx)(n.h3,{id:"github",children:"github"}),"\n",(0,l.jsx)(n.p,{children:"This is mapping of configuration variables for GitHub. The\ndefaults are as follows:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:'github:\n  # name of the github organization\n  user_or_org: conda-forge\n  # repository name, usually filled in automatically\n  repo_name: ""\n  # branch name to execute on\n  branch_name: main\n  # branch name to use for rerender+webservices github actions and\n  # conda-forge-ci-setup-feedstock references\n  tooling_branch_name: main\n'})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"github-actions"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id16"})}),"\n",(0,l.jsx)(n.h3,{id:"github_actions",children:"github_actions"}),"\n",(0,l.jsx)(n.p,{children:"This dictates the behavior of the Github Actions CI service. It is a\nmapping for GHA-specific configuration options. For example:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"github_actions:\n  # Is the job using Microsoft hosted free runners or 'self-hosted'.\n  self_hosted: false\n  # triggers for actions. Defaults to `['push', 'pull_request']` for\n  # Microsoft hosted free runners and `['push']` for self-hosted\n  triggers: []\n  # Timeout for CI jobs\n  timeout_minutes: 360\n  # Cancel in progress builds. Defaults to false for Microsoft hosted\n  # free runner and true for self-hosted\n  cancel_in_progress: None\n  # Maximum number of parallel jobs per build.\n  max_parallel: None\n  # Retain build artifacts for inspection\n  store_build_artifacts: false\n  # Retention period for built artifacts\n  artifact_retention_days: 14\n"})}),"\n",(0,l.jsxs)(n.p,{children:["For self-hosted runners ",(0,l.jsx)(n.code,{children:"recipe/conda_build_config.yaml"})," is used for\nspecifying labels for the runners."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"github_actions_labels:\n  # use Microsoft free runners\n  - hosted                                   # [osx or win]\n  # Use self-hosted runner with custom label\n  - - self-hosted                            # [linux and aarch64]\n    - custom-label                           # [linux and aarch64]\n  # Use self-hosted runner from cirun\n  - cirun-openstack-cpu-large                # [linux and ppc64le]\n  # Use self-hosted gpu runner from cirun\n  - cirun-openstack-gpu-large                # [linux and x86_64]\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"idle-timeout-minutes"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id17"})}),"\n",(0,l.jsx)(n.h3,{id:"idle_timeout_minutes",children:"idle_timeout_minutes"}),"\n",(0,l.jsx)(n.p,{children:"Configurable idle timeout that is either an int or None.  Used for packages that\ndon't have chatty enough builds. Currently only implemented in Travis and Circle."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"idle_timeout_minutes: 60\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"linux"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id18"})}),"\n",(0,l.jsx)(n.h3,{id:"linux",children:"linux"}),"\n",(0,l.jsx)(n.p,{children:"The Linux-specific configuration options. This is largely an internal setting.\nCurrently only:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"linux:\n  enabled: False\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"linux-aarch64"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id19"})}),"\n",(0,l.jsx)(n.h3,{id:"linux_aarch64",children:"linux_aarch64"}),"\n",(0,l.jsx)(n.p,{children:"The ARM-specific configuration options. This is largely an internal setting.\nCurrently only:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"linux_aarch64:\n  enabled: False\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"linux-ppc64le"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id20"})}),"\n",(0,l.jsx)(n.h3,{id:"linux_ppc64le",children:"linux_ppc64le"}),"\n",(0,l.jsx)(n.p,{children:"The PPC-specific configuration options. This is largely an internal setting.\nCurrently only:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"linux_ppc64le:\n  enabled: False\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"noarch-platforms"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id21"})}),"\n",(0,l.jsx)(n.h3,{id:"noarch_platforms",children:"noarch_platforms"}),"\n",(0,l.jsxs)(n.p,{children:["Platforms on which to build noarch packages. The preferred default is a\nsingle build on ",(0,l.jsx)(n.code,{children:"linux_64"}),"."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"noarch_platforms: linux_64\n"})}),"\n",(0,l.jsx)(n.p,{children:"To build on multiple platforms, e.g. for simple packages with platform-specific\ndependencies, provide a list."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"noarch_platforms:\n  - linux_64\n  - win_64\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"os-version"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id22"})}),"\n",(0,l.jsx)(n.h3,{id:"os_version",children:"os_version"}),"\n",(0,l.jsxs)(n.p,{children:["This key is used to set the OS versions for ",(0,l.jsx)(n.code,{children:"linux_*"})," platforms. Valid entries map a linux platform and arch to either ",(0,l.jsx)(n.code,{children:"cos6"}),"\nor ",(0,l.jsx)(n.code,{children:"cos7"}),". Currently ",(0,l.jsx)(n.code,{children:"cos6"})," is the default for ",(0,l.jsx)(n.code,{children:"linux-64"}),". All other linux architectures use CentOS 7. Here is an example that enables CentOS 7 on ",(0,l.jsx)(n.code,{children:"linux-64"})," builds"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"os_version:\n  linux_64: cos7\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"osx"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id23"})}),"\n",(0,l.jsx)(n.h3,{id:"osx",children:"osx"}),"\n",(0,l.jsx)(n.p,{children:"The macOSX-specific configuration options. This is largely an internal setting.\nCurrently only:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"osx:\n  enabled: False\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"provider"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id24"})}),"\n",(0,l.jsx)(n.h3,{id:"provider",children:"provider"}),"\n",(0,l.jsx)(n.admonition,{type:"warning",children:(0,l.jsx)(n.p,{children:"Feedstocks in conda-forge do not allow using self-hosted runners of other\nGitHub organisations."})}),"\n",(0,l.jsxs)(n.p,{children:["The ",(0,l.jsx)(n.code,{children:"provider"})," field is a mapping from build platform (not target platform) to CI service.\nIt determines which service handles each build platform. The following are available as\nbuild platforms:"]}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"linux_64"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"osx_64"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"win_64"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"linux_aarch64"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"linux_ppc64le"})}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"The following CI services are available:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"azure"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"circle"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"travis"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"appveyor"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"github_actions"})}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"None"})," or ",(0,l.jsx)(n.code,{children:"False"})," to disable a build platform."]}),"\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.code,{children:"default"})," to choose an appropriate CI (only if available)"]}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:["Note that ",(0,l.jsx)(n.code,{children:"github_actions"})," is not available for the conda-forge github organization\nexcept for self-hosted runs to avoid a denial of service due to other critical\ninfrastructure running on Github actions. Other github organizations may use\n",(0,l.jsx)(n.code,{children:"github_actions"})," as a CI provider."]}),"\n",(0,l.jsx)(n.p,{children:"For example, switching linux_64 & osx_64 to build on Travis CI, with win_64 on Appveyor:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"provider:\n  linux_64: travis\n  osx_64: travis\n  win_64: appveyor\n"})}),"\n",(0,l.jsx)(n.p,{children:"Currently, x86_64 platforms are enabled, but other build platforms are disabled by default. i.e. an empty\nprovider entry is equivalent to the following:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"provider:\n  linux_64: azure\n  osx_64: azure\n  win_64: azure\n  linux_ppc64le: None\n  linux_aarch64: None\n"})}),"\n",(0,l.jsxs)(n.p,{children:["To enable ",(0,l.jsx)(n.code,{children:"linux_ppc64le"})," and ",(0,l.jsx)(n.code,{children:"linux_aarch64"})," add the following:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"provider:\n  linux_ppc64le: default\n  linux_aarch64: default\n"})}),"\n",(0,l.jsxs)(n.p,{children:["If a desired build platform is not available with a selected provider\n(either natively or with emulation), the build will be disabled. Use the ",(0,l.jsx)(n.code,{children:"build_platform"}),"\nfield to manually specify cross-compilation when no providers offer a desired build platform."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"recipe-dir"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id25"})}),"\n",(0,l.jsx)(n.h3,{id:"recipe_dir",children:"recipe_dir"}),"\n",(0,l.jsx)(n.p,{children:"The relative path to the recipe directory. The default is:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"recipe_dir: recipe\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"remote-ci-setup"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id26"})}),"\n",(0,l.jsx)(n.h3,{id:"remote_ci_setup",children:"remote_ci_setup"}),"\n",(0,l.jsxs)(n.p,{children:["This option can be used to override the default ",(0,l.jsx)(n.code,{children:"conda-forge-ci-setup"})," package.\nCan be given with ",(0,l.jsx)(n.code,{children:"${url or channel_alias}::package_name"}),", defaults to conda-forge\nchannel_alias if no prefix is given."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:'remote_ci_setup: "conda-forge-ci-setup=3"\n'})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"shellcheck"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id27"})}),"\n",(0,l.jsx)(n.h3,{id:"shellcheck",children:"shellcheck"}),"\n",(0,l.jsx)(n.p,{children:"Shell scripts used for builds or activation scripts can be linted with shellcheck. This is not enabled by default, but can be enabled like so:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"shellcheck:\n  enabled: True\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"skip-render"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id28"})}),"\n",(0,l.jsx)(n.h3,{id:"skip_render",children:"skip_render"}),"\n",(0,l.jsxs)(n.p,{children:["This option specifies a list of files which conda smithy will skip rendering.\nThe possible values can be a subset of ",(0,l.jsx)(n.code,{children:".gitignore"}),", ",(0,l.jsx)(n.code,{children:".gitattributes"}),", ",(0,l.jsx)(n.code,{children:"README.md"}),", ",(0,l.jsx)(n.code,{children:"LICENSE.txt"}),".\nThe default value is an empty list [ ], i.e. all these four files will be generated by conda smithy.\nFor example, if you want to customize .gitignore and LICENSE.txt files on your own, you should have the following configuration."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"skip_render:\n  - .gitignore\n  - LICENSE.txt\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"templates"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id29"})}),"\n",(0,l.jsx)(n.h3,{id:"templates",children:"templates"}),"\n",(0,l.jsx)(n.p,{children:"This is mostly an internal field for specifying where templates files live.\nYou shouldn't need it."}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"test-on-native-only"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id30"})}),"\n",(0,l.jsx)(n.h3,{id:"test_on_native_only",children:"test_on_native_only"}),"\n",(0,l.jsxs)(n.p,{children:["This is used for disabling testing for cross compiling. Default is ",(0,l.jsx)(n.code,{children:"false"})]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"test_on_native_only: True\n"})}),"\n",(0,l.jsx)(n.admonition,{type:"note",children:(0,l.jsxs)(n.p,{children:["This has been deprecated in favor of the ",(0,l.jsx)(n.a,{href:"#test",children:"test"})," top-level field. It is now mapped to ",(0,l.jsx)(n.code,{children:"test: native_and_emulated"}),"."]})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"test"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id31"})}),"\n",(0,l.jsx)(n.h3,{id:"test",children:"test"}),"\n",(0,l.jsxs)(n.p,{children:["This is used to configure on which platforms a recipe is tested. Default is ",(0,l.jsx)(n.code,{children:"all"}),"."]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"test: native_and_emulated\n"})}),"\n",(0,l.jsx)(n.p,{children:"Will do testing only if the platform is native or if there is an emulator."}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"test: native\n"})}),"\n",(0,l.jsx)(n.p,{children:"Will do testing only if the platform is native."}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"travis"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id32"})}),"\n",(0,l.jsx)(n.h3,{id:"travis",children:"travis"}),"\n",(0,l.jsxs)(n.p,{children:["The top-level ",(0,l.jsx)(n.code,{children:"travis"})," key specifies configurations for the Travis\nCI service.  This is usually ",(0,l.jsx)(n.strong,{children:"read-only"})," and should not normally be manually\nmodified.  Tools like conda-smithy may modify this, as needed."]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"upload-on-branch"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id33"})}),"\n",(0,l.jsx)(n.h3,{id:"upload_on_branch",children:"upload_on_branch"}),"\n",(0,l.jsxs)(n.p,{children:["This parameter restricts uploading access on work from certain branches of the\nsame repo. Only the branch listed in ",(0,l.jsx)(n.code,{children:"upload_on_branch"})," will trigger uploading\nof packages to the target channel. The default is to skip this check if the key\n",(0,l.jsx)(n.code,{children:"upload_on_branch"})," is not in ",(0,l.jsx)(n.code,{children:"conda-forge.yml"}),". To restrict uploads to the\nmain branch:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"upload_on_branch: main\n"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"win"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{id:"id34"})}),"\n",(0,l.jsx)(n.h3,{id:"win",children:"win"}),"\n",(0,l.jsx)(n.p,{children:"The Windows-specific configuration options. This is largely an internal setting.\nCurrently only:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"win:\n  enabled: False\n"})})]})}function h(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(t,{...e})}):t(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>d,a:()=>r});var l=i(67294);const s={},a=l.createContext(s);function r(e){const n=l.useContext(a);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),l.createElement(a.Provider,{value:n},e.children)}}}]);