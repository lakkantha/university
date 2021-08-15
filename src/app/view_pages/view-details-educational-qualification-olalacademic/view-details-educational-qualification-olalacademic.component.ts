import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { EducationalQualificationOLService } from '../../educational-qulification/services/educational-qualification-ol.service';
import { EducationalQualificationALService } from '../../educational-qulification//services/educational-qualification-al.service';
import { EducationalQualificationAcademicService } from '../../educational-qulification//services/educational-qualification-academic.service';


@Component({
  selector: 'app-view-details-educational-qualification-olalacademic',
  templateUrl: './view-details-educational-qualification-olalacademic.component.html',
  styleUrls: ['./view-details-educational-qualification-olalacademic.component.css']
})
export class ViewDetailsEducationalQualificationOLALAcademicComponent implements OnInit {

  public eduOL: any = [];   // for list function
  public certificatesOL: any = []; // list certificates function
  public years: any = [];  // list past years
  public medium: any = []; // list all mediums
  public olSubjects: any = []; // list all OL subjects
  public result: any = []; // list all results

  public eduAL: any = [];   // for list function
  public alSubjects: any = []; // list all AL subjects
  public certificatesAL: any = []; // list certificates function
  public stream: any = []; // list all results

  public institution: any = []; // list all institutions
  public eduAcademic: any = [];   // for list function
  public certificatesAcademic: any = []; // list certificates function

  editedDataOL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: ''
    },
    olSubjects: {
      id: '',
    },
    result: {
      id: ''
    },
    isFill: '',
    programme: {
      programId: ''
    },
  }

  editedDataAL = {
    initialStudentId: {
      id: ''
    },
    year: '',
    indexNumber: '',
    medium: {
      mediumId: ''
    },
    stream: {
      id: ''
    },
    alSubjects: {
      id: ''
    },
    result: {
      id: ''
    },
    isFill: '',
    programme: {
      programId: ''
    },
  }

  editedDataAcademic = {
    initialStudentId: {
      id: ''
    },
    qualificationType: '',
    qualificationName: '',
    duration: '',
    institution: {
      id: ''
    },
    effectiveDate: '',
    isFill: '',
    programme: {
      programId: ''
    },
  }

  iStudentId: string = '';
  submitted = false;
  id: number;
  isFill = 0;
  programmeId: string = '';

  modalRef: BsModalRef;
  fillRef: BsModalRef;

  @ViewChild('deleteok') deleteok;
  @ViewChild('editok') editok;
  @ViewChild('fillMandatory') fillMandatory;

  constructor(private modalService: BsModalService, private olService: EducationalQualificationOLService, private alService: EducationalQualificationALService, private academicService: EducationalQualificationAcademicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.iStudentId = localStorage.getItem('initialstudentid');
    this.programmeId = localStorage.getItem("programmeid");

    this.getAllYears();
    this.getAllMediums();
    this.getAllOLSubjects();
    this.getAllResults();
    this.getAllStreams();
    this.getAllALSubjects();
    this.getDataOL(this.iStudentId);
    this.getAllCertificatesOL(this.iStudentId);
    this.getDataAL(this.iStudentId);
    this.getAllCertificatesAL(this.iStudentId);

    this.getinstitutions();
    this.getDataAcademic(this.iStudentId);
    this.getAllCertificatesAcademic(this.iStudentId);
  }
  // open delete confirmation pop up
  openDelete(deleteConfirmation: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteConfirmation,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open delete sucess msg pop up 
  openDeleteOk(deleteok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      deleteok,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // open edit pop up
  openEdit(editForm: TemplateRef<any>, id: number) {
    this.modalRef = this.modalService.show(
      editForm,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  // open edit sucess msg pop up 
  openEditOk(editok: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      editok,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // fill mandatory
  fill(fillMandatory: TemplateRef<any>) {
    this.fillRef = this.modalService.show(
      fillMandatory,
      Object.assign({}, { class: 'gray modal-md' })
    );
  }

  // get all mediums
  getAllMediums() {
    this.alService.getAllMediums()
      .subscribe(data => {
        console.log(data);
        this.medium = data;
      });
  }

  // get all streams
  getAllStreams() {
    this.alService.getAllStreams()
      .subscribe(data => {
        console.log(data);
        this.stream = data;
      });
  }

  // get all OL Subjects
  getAllOLSubjects() {
    this.olService.getAllOLSubjects()
      .subscribe(data => {
        console.log(data);
        this.olSubjects = data;
      });
  }

  // get all AL subjects
  getAllALSubjects() {
    this.alService.getAllALSubjects()
      .subscribe(data => {
        console.log(data);
        this.alSubjects = data;
      });
  }

  // get all results
  getAllResults() {
    this.alService.getAllResults()
      .subscribe(data => {
        console.log(data);
        this.result = data;
      });
  }

  // get all institutions
  getinstitutions() {
    this.academicService.getAllinstitutions()
      .subscribe(data => {
        console.log(data);
        this.institution = data;
      });
  }

  //index number add numbers only
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  // get all years
  getAllYears() {
    var date = new Date();
    var year = date.getFullYear();

    for (var i = 0; i < 20; i++) {
      year = year - 1;
      this.years.push({ year });
    }
    console.log(this.years);
  }

  /*
   * O/L data
   */

  // get all O/L data 
  getDataOL(iStudentId) {
    this.olService.getAllOL(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduOL = data;
      });
  }

  // update O/L data
  updateOL(id: number, editedDataOL) {
    if (editedDataOL.year == "" || editedDataOL.indexNumber == "" || editedDataOL.medium == "" || editedDataOL.olSubjects == "" || editedDataOL.result == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataOL.initialStudentId.id = this.iStudentId;
      editedDataOL.isFill = 1;
      editedDataOL.programme.programId = this.programmeId;
      this.olService.updateEducationalQualificationOL(id, editedDataOL)
        .subscribe(data => {
          console.log(data);
          this.getDataOL(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
    }
  }

  // delete data
  deleteOL(id: number) {
    this.olService.deleteEducationalQualificationOL(id)
      .subscribe(data => {
        this.getDataOL(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  // get all certificates
  getAllCertificatesOL(iStudentId) {
    this.olService.getAllCertificatesOL(iStudentId)
      .subscribe(res => this.certificatesOL = res);
  }

  // delete O/L certificates
  deleteCertificatesOL(id: number) {
    this.olService.deleteCertificatesOL(id)
      .subscribe(res => this.getAllCertificatesOL(this.iStudentId));
  }

  /*
   * A/L data
  */
  // get all A/L data
  getDataAL(iStudentId) {
    this.alService.getAllAL(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduAL = data
      });
  }

  // update A/L data
  updateAL(id: number, editedDataAL) {
    if (editedDataAL.year == "" || editedDataAL.indexNumber == "" || editedDataAL.medium == "" || editedDataAL.stream == "" || editedDataAL.alSubjects.id == "" || editedDataAL.result == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataAL.initialStudentId.id = this.iStudentId;
      editedDataAL.isFill = 1;
      editedDataAL.programme.programId = this.programmeId;
      this.alService.updateEducationalQualificationAL(id, editedDataAL)
        .subscribe(data => {
          console.log(data);
          this.getDataAL(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
    }
  }

  // delete A/L data
  deleteAL(id: number) {
    this.alService.deleteEducationalQualificationAL(id)
      .subscribe(data => {
        this.getDataAL(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  // get all A/Lcertificates
  getAllCertificatesAL(iStudentId) {
    this.alService.getAllCertificatesAL(iStudentId)
      .subscribe(res => this.certificatesAL = res)
  }

  // delete A/L certificates
  deleteCertificatesAL(id: number) {
    this.alService.deleteCertificatesAL(id)
      .subscribe(res => this.getAllCertificatesAL(this.iStudentId));
  }

  // get all Academic data
  getDataAcademic(iStudentId) {
    this.academicService.getAllAcademic(iStudentId)
      .subscribe(data => {
        console.log(data);
        this.eduAcademic = data
      });
  }

  // update Academic data
  updateAcademic(id: number, editedDataAcademic) {
    if (editedDataAcademic.qualificationType == "" || editedDataAcademic.qualificationName == "" || editedDataAcademic.duration == "" || editedDataAcademic.institution.id == "" || editedDataAcademic.effectiveDate == "") {
      this.fill(this.fillMandatory);
    } else {
      editedDataAcademic.initialStudentId.id = this.iStudentId;
      editedDataAcademic.isFill = 1;
      editedDataAcademic.programme.programId = this.programmeId;
      this.academicService.updateEducationalQualificationAcademic(id, editedDataAcademic)
        .subscribe(data => {
          console.log(data);
          this.getDataAcademic(this.iStudentId);
          this.modalRef.hide();
          this.openEditOk(this.editok);
        });
    }
  }

  // delete Academic data
  deleteAcademic(id: number) {
    this.academicService.deleteEducationalQualificationAcademic(id)
      .subscribe(data => {
        console.log(data);
        this.getDataAcademic(this.iStudentId);
        this.modalRef.hide();
        this.openDeleteOk(this.deleteok);
      });
  }

  // get all Academic certificates
  getAllCertificatesAcademic(iStudentId) {
    this.academicService.getAllCertificatesAcademic(iStudentId)
      .subscribe(res => this.certificatesAcademic = res)
  }

  // delete Academic certificates 1
  deleteCertificatesAcademic(id: number) {
    this.academicService.deleteCertificatesAcademic(id)
      .subscribe(res => {
        console.log(res);
        this.getAllCertificatesAcademic(this.iStudentId);
      });
  }

}
