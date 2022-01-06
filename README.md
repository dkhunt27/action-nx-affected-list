# action-nx-affected-list
Github action for outputting a list of affected nx projects (apps and libs)

### Action inputs

The possible inputs for this action are:

| Parameter | Required | Default  | Description |
| --------- | -------- | -------- | ----------- |
| base | false | | Base of the current branch (usually main)  |
| head | false | | Latest commit of the current branch (usually HEAD) |
                                                                                                                                   
### Action outputs

The outputs for this action are:

| Parameter | Description |
| --------- | ----------- |
| affectedApps | an array of affected app names |
| affectedLibs | an array of affected lib names |
| affected | an array of affected app and lib names |

### Usage
```
      - name: Check for Affected Projects
        uses: dkhunt27/action-nx-affected-list@v2
        id: affected

      - if: steps.affected.outputs.affected.length > 0
        name: Build (Nx Affected)
        uses: mansagroup/nrwl-nx-action@v2
        with:
          targets: build
          affected: true
          nxCloud: false
```
## Making changes and pushing releases

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
