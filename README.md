# action-nx-affected-list
Github action for outputting a list of affected nx projects (apps and libs)

### Action inputs

The possible inputs for this action are:

``` yaml
inputs:
    base:
        description: Base of the current branch (usually main)
        required: false
    head:
        description: Latest commit of the current branch (usually HEAD)
        required: false
```
                                                                                                                                   
### Action outputs

The outputs for this action are:
``` yaml
outputs:
    affectedApps:
        description: array of affected app names
    hasAffectedApps:
        description: true/false if there are affected apps
    affectedLibs:
        description: array of affected lib names
    hasAffectedLibs:
        description: true/false if there are affected libs
    affected:
        description: array of affected projects (apps/libs) names
    hasAffected:
        description: true/false if there are affected projects (apps/libs)
```

### Usage
``` yaml
      - name: Check for Affected Projects
        uses: dkhunt27/action-nx-affected-list@v4
        id: checkForAffected

      - if: steps.checkForAffected.outputs.hasAffected == 'true'
        name: Build (Nx Affected)
        uses: mansagroup/nrwl-nx-action@v2
        with:
          targets: build
          affected: true
          nxCloud: false

      - if: contains(steps.checkForAffected.outputs.affected, 'someAppName')
        ### do something specific for someAppName
```
## Making changes and pushing releases

+ make new branch and make changes
+ npm run all
+ git commit/push changes
+ make PR back to main
+ wait for pipelines to finish (test will always finish with an error since this isn't a nx monorepo)
+ git checkout main
+ git pull 
+ git tag v1
+ SKIP_HOOKS=true git push origin v1
+ in github, edit tag and save (this will push to marketplace)


## NPM Check
```
npm run npm:check
```

## Acknowledgements
Thanks to ignition-is-go which was the starting point of this code (couldn't find a published version of it)

  - [ignition-is-go/action-nx-affected-apps](https://github.com/ignition-is-go/action-nx-affected-apps)
