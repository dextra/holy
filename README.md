Holy Framework
==

Let the browser side stronger.

Install Google App Engine Python SDK
--

    ./gae-py-install.sh
    
Do it before anything to put the SDK in the $PATH:

    source env.sh
    
Devel Server
--
    ./util/minify.sh
    ./dev.sh
    
Deploy
--

This script will arrange the version file and minify resources before deploy

    ./deploy.sh
    
Release
--

You want to release some version, like x.y.z:

    ./release.sh x.y.z
    
If something goes wrong on release, you need to delete tag x.y.z

    /util/delete-tag.sh holy-x.y.z
    
If everthing works fine until here, you need to deploy it (the same x.y.z):

    ./release-deploy.sh x.y.z
    


   




