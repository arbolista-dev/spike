import gulp from 'gulp';
import template from 'gulp-template';
import rename from 'gulp-rename';
import foreach from 'gulp-foreach';
import generateHelper from '../generate_helper';

// takes template
// runs it through lodash templating engine
// feeding it its name
// and then creates a copy of processed files
export function fnGenerate(name, templateDir, dest, templateName) {
  gulp.src(templateDir)
    .pipe(foreach(stream =>
       stream
        .pipe(template(generateHelper.data(name)))
        .pipe(rename((renamePath) => {
          const newPath = renamePath;
          newPath.basename = generateHelper.fileName(newPath.basename, name, templateName);
          newPath.extname = newPath.extname.replace('.tpl', '');
        }))
        .pipe(gulp.dest(dest))
    ));
}

export function getPath(element, prefix, enable) {
  const flag = enable ? '' : '!';
  return `${flag}${__dirname}/../templates/${element}/*${prefix}.tpl`;
}

