{{#resume}}
<section id="resume" class="resume">
  <div class="container-fluid">
    <div class="clearfix">
      <h2 class="pull-left">Resume</h2>
      <a href="AdamGruber_Resume2016.pdf" target="_blank" class="btn btn-default download-btn">
        <i class="fa fa-file-pdf-o"></i> Download PDF
      </a>
    </div>
    <div class="row">
      <div class="col-sm-4">
        <!-- Education -->
        <div class="resume-wrap education">
          <h3 class="resume-section-header">Education</h3>
          <h4>Rochester Institute of Technology</h4>
          <h5>Rochester NY | May 2001</h5>
          <ul class="list-unstyled resume-list degrees">
            <li class="degree">Bachelor of Fine Arts in Graphic Design</li>
            <li class="degree">Associate of Applied Science in Industrial Design</li>
          </ul>
        </div>
        <!-- Skills -->
        <div class="resume-wrap skills">
          <h3 class="resume-section-header">Skills / Technologies</h3>
          <div class="row">
            <div class="col-xs-6">
              <h4>Develop</h4>
              <ul class="list-unstyled resume-list">
                {{#skills.develop}}
                <li>{{.}}</li>
                {{/skills.develop}}
              </ul>
            </div>
            <div class="col-xs-6">
              <h4>Design</h4>
              <ul class="list-unstyled resume-list">
                {{#skills.design}}
                <li>{{.}}</li>
                {{/skills.design}}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-8">
        <!-- Experience -->
        <div class="resume-wrap experience">
          <h3 class="resume-section-header">Experience</h3>
          {{#experience}}
            <h4 class="job-title">{{jobTitle}}</h4>
            <span class="date-range">{{dates}}</span>
            <h5 class="company">{{company}} | {{location}}</h5>
            <ul class="list-unstyled resume-list duties">
              {{#duties}}
              <li>{{.}}</li>
              {{/duties}}
            </ul>
          {{/experience}}
        </div>
      </div>
    </div>
  </div>
</section>
{{/resume}}