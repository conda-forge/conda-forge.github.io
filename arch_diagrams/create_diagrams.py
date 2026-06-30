from diagrams import Cluster, Diagram, Edge
from diagrams.onprem.vcs import Github
from diagrams.onprem.ci import GithubActions, TravisCI, DroneCI, CircleCI
from diagrams.azure.devops import Pipelines
from diagrams.generic.storage import Storage
from diagrams.generic.place import Datacenter
from diagrams.generic.compute import Rack as Heroku

with Diagram(name="Conda-Forge Conceptual", show=False, graph_attr=dict(concentrate='True')):
    staged_recipes = Github(label='staged-recipes')
    with Cluster('Build CIs'):
        cis = [Pipelines(label='Windows, Linux, \nMacOS'), DroneCI(label='aarch64'), TravisCI(label='powerpc'),
               CircleCI('misc')]

    linter = Heroku(label='metadata linter')
    rerender = GithubActions(label='feedstock rerender')
    create_feedstock = GithubActions(label='create feedstock repo')
    autotick = GithubActions(label='autotick bot')

    new_feedstock = Github(label='new feedstock')
    anaconda_server = Storage(label='Anaconda Servers')
    pinnings = Github(label='ABI pins')

    internet = Datacenter(label='new version numbers')
    validation = Heroku(label='pkg validation')

    admin_migrations = CircleCI('admin migrations')


    staged_recipes >> cis >> staged_recipes
    staged_recipes >> linter >> staged_recipes
    staged_recipes >> create_feedstock >> new_feedstock >> cis >> validation >> anaconda_server

    new_feedstock >> linter >> new_feedstock
    rerender >> new_feedstock

    autotick >> new_feedstock
    pinnings >> autotick
    internet >> autotick

    admin_migrations >> new_feedstock

with Diagram(name="Conda-Forge Implementation", show=False, graph_attr=dict(concentrate='True')):
    staged_recipes = Github(label='staged-recipes')
    new_feedstock = Github(label='new feedstock')
    pinnings = Github(label='ABI pins')

    with Cluster('Build CIs'):
        cis = [Pipelines(label='Windows, Linux, \nMacOS'), DroneCI(label='aarch64'), TravisCI(label='powerpc'),
               CircleCI('misc')]

    with Cluster('Heroku Webservices'):
        linter = Heroku(label='metadata linter')
        validation = Heroku(label='pkg validation')
        other_cmds = Heroku(label='webservice commands')

    rerender = GithubActions(label='feedstock rerender')
    other_cmds >> rerender

    create_feedstock = GithubActions(label='create feedstock repo')
    autotick = GithubActions(label='autotick bot')

    anaconda_server = Storage(label='Anaconda Servers')

    internet = Datacenter(label='new version numbers')

    admin_migrations = CircleCI('admin migrations')

    staged_recipes >> cis >> staged_recipes
    staged_recipes >> linter >> staged_recipes
    staged_recipes >> create_feedstock >> new_feedstock >> cis >> validation >> anaconda_server

    new_feedstock >> linter >> new_feedstock
    rerender >> new_feedstock

    autotick >> new_feedstock
    pinnings >> autotick
    internet >> autotick

    admin_migrations >> new_feedstock

