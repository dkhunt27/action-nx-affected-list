# action-nx-affected-list
Github action for outputting a list of affected nx projects (apps and libs)

## Inputs
See [action.yml](./action.yml)


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