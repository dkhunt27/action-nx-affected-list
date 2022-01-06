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

## Making changes and pushing releases

+ wait for pipelines to finish
+ git checkout main
+ git pull 
+ git tag v0.3.0
+ SKIP_HOOKS=true git push origin v0.3.0
+ in github, edit tag and save (this will push to marketplace)


## NPM Check
```
npm run npm:check
```

## Acknowledgements
Thanks to ignition-is-go which was the starting point of this code (couldn't find a published version of it)

  - [ignition-is-go/action-nx-affected-apps](https://github.com/ignition-is-go/action-nx-affected-apps)
